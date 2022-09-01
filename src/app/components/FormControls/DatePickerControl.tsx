import { useField, useFormikContext } from 'formik';
import { isFunction } from 'lodash';
import React, { useCallback, useState } from 'react';
import { DatePicker, IDatePickerProps } from '..';

interface IDatePickerControl extends IDatePickerProps {
  defaultValue?: Date;
  containerClassName?: string;
  onValueChange?: (value: Date) => void;
}

const DatePickerControl: React.FC<IDatePickerControl> = ({
  name = '',
  defaultValue,
  containerClassName,
  onValueChange,
  ...props
}) => {
  const [{ value: valueProp, onBlur }, { touched, error }, { setTouched }] =
    useField(name);
  const { setFieldValue } = useFormikContext();

  const [value, setValue] = useState<Date>(valueProp);

  const handleChange = useCallback(
    (value: Date) => {
      setValue(value);
      setFieldValue(name, value);

      if (isFunction(onValueChange)) {
        onValueChange(value);
      }
    },
    [name, onValueChange, setFieldValue]
  );

  const handleBlur: React.FocusEventHandler<HTMLInputElement> = useCallback(
    e => {
      onBlur(e);
      setTouched(true);
    },
    [onBlur, setTouched]
  );

  return (
    <div className={containerClassName}>
      <DatePicker
        {...props}
        name={name}
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
        error={
          !props.disabled && touched && error
            ? {
                status: true,
                message: error
              }
            : undefined
        }
      />
    </div>
  );
};

export default DatePickerControl;
