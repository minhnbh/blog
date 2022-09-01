import classes from 'app/utils/classes';
import React, {
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState
} from 'react';
import { FormControl, FormGroup, InputGroup } from 'react-bootstrap';
import classnames from 'classnames';
import { FormLabel, Tooltip } from 'app/components';
import { FLOAT_NUMBER_REGEX } from 'app/constants/common';
import {
  getFormat,
  CURRENCY,
  NUMBER,
  PERCENT,
  formatNumber
} from 'app/helpers/formatNumber';
import { isEmpty, isNull, isUndefined } from 'lodash';
import { ITooltipProps } from '../Tooltip';
import parse from 'html-react-parser';

export interface NumericTextBoxProps {
  label?: string;
  placeholder?: string;
  value?: string | number;
  required?: boolean;
  readOnly?: boolean;
  readOnlyText?: string;
  disabled?: boolean;
  autoFocus?: boolean;
  className?: string;
  containerClassName?: string;
  error?: FormError;
  focus?: boolean;
  name?: string;
  maxLength?: number;
  format?: string;
  prefix?: React.ReactElement | string;
  suffix?: React.ReactElement | string;
  tooltipClassName?: string;
  tooltipProps?: ITooltipProps;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClick?: () => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onKeyUp?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onKeyPress?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onPaste?: (e: React.ClipboardEvent<HTMLInputElement>) => void;
}
const NumericTextBox = React.forwardRef<HTMLInputElement, NumericTextBoxProps>(
  (
    {
      label,
      name,
      value: valueProp,
      placeholder = '',
      required = false,
      readOnly = false,
      readOnlyText,
      disabled = false,
      autoFocus,
      error = {
        status: false,
        message: ''
      },
      className = '',
      containerClassName = '',
      focus = false,
      maxLength,
      format = 'n2',
      tooltipProps,
      onChange,
      onClick,
      onBlur,
      onFocus,
      prefix,
      suffix,
      tooltipClassName,
      ...props
    },
    ref
  ) => {
    const inputRef = useRef<HTMLInputElement | null>(null);
    const [value, setValue] = useState(valueProp || '');
    const [isFocus, setIsFocus] = useState(autoFocus || focus);
    const [type, setType] = useState(NUMBER);
    const [decimalLength, setDecimalLength] = useState<string | undefined>();
    const [currentCursor, setCurrentCursor] = useState({
      start: 0,
      end: 0
    });

    const handleChange = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        let changeValue = e.target.value;
        if (maxLength && changeValue.length > maxLength) return;
        const { selectionStart, selectionEnd } = e.target;

        setCurrentCursor({
          start: selectionStart || 0,
          end: selectionEnd || 0
        });

        if (isEmpty(changeValue)) {
          setValue('');
          onChange && onChange(e);
        }

        const [intNum, decimalNum] = changeValue.split('.');
        const [currentIntNum, currentDecimalNum] = value.toString().split('.');

        const formatIntNum = (() => {
          if (!intNum && !currentDecimalNum) return '';
          if (!currentIntNum || Number(intNum) !== 0) return intNum;
          return intNum[0];
        })();

        const formatDecimalNum = (() => {
          if (decimalNum) {
            // 0,10 => 0,1
            if (
              selectionStart === changeValue.length - 1 &&
              currentDecimalNum === '0'
            )
              return `.${decimalNum.substring(0, 1)}`;
            return `.${decimalNum.substring(
              0,
              decimalLength ? Number(decimalLength) : undefined
            )}`;
          }
          if (isEmpty(decimalNum) && !isUndefined(decimalNum)) {
            if (value.toString().indexOf('.') >= 0) return '';
            return '.0';
          }
          return '';
        })();

        changeValue = `${formatIntNum}${formatDecimalNum}`;

        if (Number(decimalLength) > 0) {
          // prevent remove dot if float number
          if (changeValue.indexOf('.') === -1) {
            if (changeValue.length > 1) return;
          }
          // prevent duplicate dot in number
          if (changeValue.split('.').length > 2) return;
        }

        if (
          changeValue.match(FLOAT_NUMBER_REGEX)?.[0].length ===
          changeValue.length
        ) {
          const newValue = decimalLength
            ? formatNumber(changeValue, `n${decimalLength || '0'}`)
            : changeValue;
          e.target.value = newValue;
          setValue(newValue);
          onChange && onChange(e);
        }
      },
      [decimalLength, maxLength, onChange, value]
    );

    useEffect(() => {
      inputRef.current!.selectionStart = inputRef.current!.selectionEnd =
        currentCursor.start;
    }, [value, currentCursor]);

    const handleFocus = useCallback(
      (e: React.FocusEvent<HTMLInputElement>) => {
        onClick && onClick();
        onFocus && onFocus(e);
        setIsFocus(true);
      },
      [onClick, onFocus]
    );

    const handleBlur = useCallback(
      (e: React.FocusEvent<HTMLInputElement>) => {
        onBlur && onBlur(e);
        setIsFocus(false);
      },
      [onBlur]
    );

    useEffect(() => {
      setValue(
        decimalLength
          ? formatNumber(valueProp?.toString(), `n${decimalLength || ''}`)
          : valueProp || ''
      );
    }, [decimalLength, valueProp]);

    useEffect(() => {
      const { type, numberDecimal } = getFormat(format);
      setType(type);
      setDecimalLength(
        isNaN(numberDecimal) ? undefined : numberDecimal.toString()
      );
    }, [format]);

    const prefixView = useMemo(() => {
      if (prefix) {
        return (
          <InputGroup.Text
            className={classnames(classes.textBox.prefix, 'fs-14 fw-500', {
              [classes.textBox.error]: error.status,
              [classes.textBox.readOnly]: readOnly
            })}
          >
            {prefix}
          </InputGroup.Text>
        );
      }
      return null;
    }, [prefix, error.status, readOnly]);

    const suffixView = useMemo(() => {
      const viewArr = [];
      if (type === CURRENCY) {
        viewArr.push(
          <InputGroup.Text
            className={classnames(classes.textBox.suffix, 'fs-14 fw-500', {
              [classes.textBox.error]: error.status,
              [classes.textBox.readOnly]: readOnly,
              'text-box-has-suffix': !isUndefined(suffix) && !isNull(suffix)
            })}
          >
            đ
          </InputGroup.Text>
        );
      }
      if (type === PERCENT) {
        viewArr.push(
          <InputGroup.Text
            className={classnames(classes.textBox.suffix, 'fs-14 fw-500', {
              [classes.textBox.error]: error.status,
              [classes.textBox.readOnly]: readOnly,
              'text-box-has-suffix': !isUndefined(suffix) && !isNull(suffix)
            })}
          >
            %
          </InputGroup.Text>
        );
      }
      if (suffix) {
        viewArr.push(
          <InputGroup.Text
            className={classnames(classes.textBox.suffix, 'fs-14 fw-500', {
              [classes.textBox.error]: error.status,
              [classes.textBox.readOnly]: readOnly
            })}
          >
            {suffix}
          </InputGroup.Text>
        );
      }
      return viewArr;
    }, [error.status, type, suffix, readOnly]);

    useImperativeHandle(ref, () => inputRef.current!, []);

    const isShowTooltip = useMemo(() => {
      if (!isUndefined(tooltipProps)) return undefined;
      if (!error.status || isEmpty(error.message) || !isFocus) return false;
      return true;
    }, [error.message, error.status, isFocus, tooltipProps]);

    const formatTooltipProps = useMemo<ITooltipProps>(
      () => ({
        ...tooltipProps,
        show: isShowTooltip,
        message: (
          <div>{parse((tooltipProps?.message || error.message) as string)}</div>
        ),
        variant: tooltipProps?.variant || 'danger',
        placement: tooltipProps?.placement || 'top-start'
      }),
      [error.message, isShowTooltip, tooltipProps]
    );

    return (
      <div className={classnames(containerClassName)}>
        <Tooltip
          {...formatTooltipProps}
          className={classnames(tooltipClassName, {
            'mb-n30': !isUndefined(label) && !tooltipClassName
          })}
        >
          <FormGroup
            className={classnames({
              [classes.textBox.container]: true,
              [classes.textBox.focus]: isFocus
            })}
          >
            {label && (
              <FormLabel
                required={required}
                readOnly={readOnly}
                readOnlyText={readOnlyText}
              >
                {label}
              </FormLabel>
            )}

            <InputGroup>
              {prefixView}
              <FormControl
                ref={inputRef}
                {...props}
                className={classnames(
                  {
                    [classes.textBox.input]: true,
                    [classes.textBox.hasPrefix]: prefix,
                    [classes.textBox.hasSuffix]:
                      type === CURRENCY || type === PERCENT || suffix,
                    [classes.textBox.readOnly]: readOnly,
                    [classes.textBox.error]: error.status
                  },
                  className
                )}
                readOnly={readOnly}
                disabled={disabled}
                placeholder={placeholder}
                required={required}
                autoFocus={isFocus}
                value={value}
                name={name}
                maxLength={maxLength}
                onChange={handleChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
              />
              {suffixView.map(item => item)}
            </InputGroup>
          </FormGroup>
        </Tooltip>
      </div>
    );
  }
);

export default NumericTextBox;
