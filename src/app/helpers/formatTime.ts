import { isDate, isString } from 'lodash';
import dateTime from 'date-and-time';

export const prepareDateStringFormat = (
  date: string,
  outputFormat = 'MM_DD_YYYY'
): string => {
  const XX_XX_YYYY = new RegExp('^[0-9]{2}(/|-)[0-9]{2}(/|-)[0-9]{4}$');

  const separator = date.includes('/') ? '/' : '-';

  const dateParts = date.split(separator);
  if (dateParts.length !== 3) return '';

  let [year, month, day] = dateParts;

  if (XX_XX_YYYY.test(date)) {
    [day, month, year] = dateParts;
  }

  if (outputFormat === 'MM_DD_YYYY') {
    return [
      month.toString().padStart(2, '0'),
      day.toString().padStart(2, '0'),
      year.toString().padStart(4, '0')
    ].join(separator);
  } else {
    return [
      year.toString().padStart(4, '0'),
      month.toString().padStart(2, '0'),
      day.toString().padStart(2, '0')
    ].join(separator);
  }
};

export const formatTimeDefault = (
  date: string | Date | null,
  outputFormat: string,
  inputFormat?: string
) => {
  if (!date) return;

  const invalidFormatRegex = new RegExp('^[1-9]+$');
  const validDateFormat = new RegExp('^[0-9]{4}(/|-)[0-9]{2}(/|-)[0-9]{2}$');
  const validDateFormat1 = new RegExp('^[0-9]{2}(/|-)[0-9]{2}(/|-)[0-9]{4}$');

  if (typeof date === 'string' && invalidFormatRegex.test(date)) {
    return undefined;
  }

  if (isString(date) && validDateFormat1.test(date)) {
    date = prepareDateStringFormat(date);
  }

  let newDate = new Date(date);
  if (
    (isString(date) &&
      (validDateFormat.test(date) || validDateFormat1.test(date))) ||
    isDate(date)
  ) {
    return dateTime.format(newDate, outputFormat);
  }

  newDate = isString(date)
    ? dateTime.parse(date, inputFormat || outputFormat.replace(/\//g, '-'))
    : date;

  if (newDate && isDate(newDate)) {
    return dateTime.format(newDate, outputFormat);
  }

  return;
};
