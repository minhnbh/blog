import React, { useCallback, useMemo, useState } from 'react';
import DatePickerBase, { ReactDatePickerProps } from 'react-datepicker';
import { TextBox, Icon } from 'app/components';
import DatePickerHeader from './Header';
import classes from 'app/utils/classes';
import { isEmpty, isString, isUndefined } from 'lodash';
import * as Popper from '@popperjs/core';
import Tooltip, { ITooltipProps } from '../Tooltip';
import parse from 'html-react-parser';

export interface IDatePickerProps
  extends Omit<ReactDatePickerProps, 'value' | 'onChange'> {
  label?: string;
  value?: string | Date;
  required?: boolean;
  popperPlacement?: Popper.Placement;
  error?: FormError;
  id?: string;
  name?: string;
  tooltipProps?: ITooltipProps;
  readOnlyText?: string;
  onChange?: (e: Date) => void;
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
}

const DatePicker: React.FC<IDatePickerProps> = props => {
  const {
    label,
    value: valueProp,
    required,
    minDate,
    maxDate,
    popperPlacement,
    error = {
      status: false,
      message: ''
    },
    name = '',
    id,
    tooltipProps,
    readOnly = false,
    readOnlyText,
    onChange,
    onFocus,
    onBlur
  } = props;
  const [value, setValue] = useState(
    isString(valueProp) ? new Date(valueProp) : valueProp || new Date()
  );
  const [focus, setFocus] = useState(false);

  const handleChange = useCallback(
    (e: Date) => {
      setValue(e);
      onChange && onChange(e);
    },
    [onChange]
  );

  const handleFocus: React.FocusEventHandler<HTMLInputElement> = useCallback(
    e => {
      setFocus(true);
      onFocus && onFocus(e);
    },
    [onFocus]
  );

  const handleBlur: React.FocusEventHandler<HTMLInputElement> = useCallback(
    e => {
      setFocus(false);
      onBlur && onBlur(e);
    },
    [onBlur]
  );

  const isShowTooltip = useMemo(() => {
    if (!isUndefined(tooltipProps)) return undefined;
    if (!error.status || isEmpty(error.message) || !focus) return false;
    return true;
  }, [error.message, error.status, focus, tooltipProps]);

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
    <Tooltip {...formatTooltipProps} className="mb-n30">
      <DatePickerBase
        selected={value}
        id={id}
        name={name}
        customInput={
          <TextBox
            label={label}
            textBoxRequired={required}
            readOnly
            readOnlyText={readOnlyText}
            suffix={<Icon name="calendar" />}
          />
        }
        calendarClassName={classes.datePicker.calendar}
        dayClassName={_ => classes.datePicker.day}
        monthClassName={_ => classes.datePicker.month}
        weekDayClassName={_ => classes.datePicker.weekday}
        minDate={minDate}
        maxDate={maxDate}
        renderCustomHeader={props => <DatePickerHeader {...props} />}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        popperPlacement={popperPlacement}
        readOnly={readOnly}
        portalId="root"
      />
    </Tooltip>
  );
};

export default DatePicker;
