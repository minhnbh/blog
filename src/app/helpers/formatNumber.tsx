import React, { ReactText } from 'react';
import { isUndefined, isEmpty } from 'lodash';
export const CURRENCY = 'currency';
export const PERCENT = 'percent';
export const NUMBER = 'number';
export const INTEGER = 'integer';

export const numericRegex = new RegExp(/^\d*$/);

export const isNumber = (value: string) => {
  return numericRegex.test(value);
};

export const isNumberFloat = (value: string) => {
  // 123. || 123.00
  const isFloat1 = /^d+(\.)?(\d+)?$/.test(value);
  // .123 || 0.123
  const isFloat2 = /^(\d+)?(\.)?(\d+)$/.test(value);
  return isFloat1 || isFloat2;
};

export const getFormat = (value: string) => {
  const arrFormat = value.split('');

  const mappingType: Record<string, string> = {
    c: CURRENCY,
    p: PERCENT,
    n: NUMBER,
    i: INTEGER
  };

  return {
    type: mappingType[arrFormat[0]] || NUMBER,
    numberDecimal: Number(arrFormat[1])
  };
};

export const isValidInput = (value: ReactText | undefined, format: string) => {
  if (isUndefined(value) || isEmpty(value)) return false;
  if (!isFinite(Number(value.toString().replace(/,/g, '')))) return false;
  const { type } = getFormat(format);
  if (type === INTEGER && value.toString().includes('.')) return false;
  return true;
};

/**
 *
 * @param value accept format c1, c2, c3 ... | p1, p2, p3, ... | n1, n2, n3, ... | i1, i2, i3,...
 * @param format
 * @returns
 */
export const formatNumber = (value: ReactText | undefined, format: string) => {
  if (!isValidInput(value, format)) return '';
  const strValue = value!.toString().replace(/,/g, '');
  const { type, numberDecimal } = getFormat(format);
  const isFloat = numberDecimal !== 0;

  // type p: 0.12 => 12 | others: 0.12 => 0.12
  const [integer, decimal = ''] = (
    type === PERCENT ? (Number(strValue) * 100).toString() : strValue
  ).split('.');

  const hasSign = integer[0] === '-';
  let absInteger = hasSign ? integer.substring(1) : integer;
  absInteger = Number(absInteger).toString();

  let formatDecimalNumber = '';

  if (isFloat) {
    for (let i = 0; i < numberDecimal; i++) {
      formatDecimalNumber += decimal[i] || '0';
    }
    if (decimal[numberDecimal] && Number(decimal[numberDecimal]) >= 5) {
      formatDecimalNumber = (Number(formatDecimalNumber) + 1).toString();
      if (formatDecimalNumber.length > numberDecimal) {
        formatDecimalNumber = Array.from({ length: numberDecimal })
          .fill('0')
          .join('');
        absInteger = (Number(absInteger) + 1).toString();
      }
    }
    if (formatDecimalNumber.length !== numberDecimal) {
      for (let i = 0; i < numberDecimal - formatDecimalNumber.length; i++) {
        formatDecimalNumber = `0${formatDecimalNumber}`;
      }
    }
  }

  const result = `${hasSign ? '-' : ''}${absInteger}${
    numberDecimal > 0 ? '.' : ''
  }${formatDecimalNumber}`;

  if (type === PERCENT) {
    return formatPercent(result);
  } else if (type === CURRENCY) {
    return formatCurrency(result);
  }
  return result;
};

export const formatViewNumber = (
  value: ReactText | undefined,
  format: string
) => {
  if (!isValidInput(value, format)) return '';
  const { type, numberDecimal } = getFormat(format);
  const result = formatNumber(
    type === PERCENT ? (Number(value) * 100).toString() : value,
    `n${numberDecimal}`
  );
  const [intNum, decimalNum] = result.split('.');
  const hasSign = intNum[0] === '-';
  const intNumStr = hasSign ? intNum.substring(1) : intNum;
  const delta = intNumStr.length % 3;
  const viewNumber =
    intNumStr.length <= 3
      ? result
      : `${hasSign ? '-' : ''}${intNumStr
          .split('')
          .map((item, i) => {
            if (i !== 0 && (i - delta) % 3 === 0) return `,${item}`;
            return item;
          })
          .join('')}${decimalNum ? '.' + decimalNum : ''}`;

  if (type === PERCENT) {
    return formatPercent(viewNumber);
  } else if (type === CURRENCY) {
    return formatCurrency(viewNumber);
  }
  return viewNumber;
};

const formatCurrency = (value: string) => {
  if (value[0] === '-') {
    return `-${value.substring(1)}đ`;
  }
  return `${value}đ`;
};

const formatPercent = (value: string) => `${value}%`;

export const getNumberValue = (value: string | undefined) => {
  if (!value) return 0;
  if (isNumber(value)) {
    return Number(value);
  }
  return 0;
};

export const formatDeltaNumberView = (
  value: ReactText | undefined,
  format: string
) => {
  if (!isValidInput(value, format)) return '';
  const result = formatViewNumber(value, format);
  return (
    <span className={`${result[0] === '-' ? 'text-danger' : 'text-success'}`}>
      {`${result[0] !== '-' ? '+' : ''}`}
      {result}
    </span>
  );
};
