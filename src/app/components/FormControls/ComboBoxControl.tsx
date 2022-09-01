import React, { useState, useEffect, useMemo } from 'react';
import { ComboBox, ComboBoxProps } from 'app/components';
import { useField } from 'formik';
import { isFunction } from 'lodash';

type ComboBoxControlProps = ComboBoxProps & {
  containerClassName?: string;
  onValueChange?: (value: any) => void;
};

const ComboBoxControl: React.FC<ComboBoxControlProps> = ({
  name = '',
  options: optionsProp,
  containerClassName,
  disabled = false,
  readOnly = false,
  dataField,
  onValueChange,
  ...props
}) => {
  const [
    { value: valueProp, onBlur },
    { touched, error },
    { setTouched, setValue: setFormValue }
  ] = useField(name);

  const [value, setValue] = useState(valueProp);

  const options = useMemo(() => optionsProp, [optionsProp]);

  const handleChange = (selected: any) => {
    setValue(selected);
    setFormValue(dataField ? selected[dataField] : selected);

    if (isFunction(onValueChange)) {
      onValueChange(selected);
    }
  };

  const handleFocus: React.FocusEventHandler<HTMLInputElement> = e => {
    // setTouched(true);
  };

  const handleBlur: React.FocusEventHandler<HTMLInputElement> = e => {
    setTouched(true);
    onBlur(e);
  };

  useEffect(() => {
    setValue(valueProp ?? null);
  }, [valueProp, options, name]);

  return (
    <div className={containerClassName}>
      <ComboBox
        {...props}
        name={name}
        value={value}
        options={options}
        disabled={disabled}
        readOnly={readOnly}
        onFocus={handleFocus}
        onChange={handleChange}
        onBlur={handleBlur}
        error={
          !disabled && touched && error
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

export default ComboBoxControl;
