import { useField, useFormikContext } from 'formik';
import { isFunction } from 'lodash';
import React, { useEffect, useMemo, useState } from 'react';
import MultiSelect, { MultiSelectProps } from '../MultiSelect';

type MultiSelectControlProps = MultiSelectProps & {
  containerClassName?: string;
  onValueChange?: (value: any) => void;
};

const MultiSelectControl: React.FC<MultiSelectControlProps> = ({
  name = '',
  options: optionsProp,
  dataField,
  containerClassName,
  onValueChange,
  ...props
}) => {
  const [{ value: valueProp, onBlur }, { touched, error }, { setTouched }] =
    useField(name);

  const { setFieldValue } = useFormikContext();

  const [value, setValue] = useState(valueProp);

  const options = useMemo(() => optionsProp, [optionsProp]);

  const handleChange = (selected: MagicKeyValue[]) => {
    setValue(selected);
    setFieldValue(name, selected);

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
    setValue(valueProp);
  }, [valueProp]);

  return (
    <div className={containerClassName}>
      <MultiSelect
        {...props}
        name={name}
        value={value}
        options={options}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onChange={handleChange}
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

export default MultiSelectControl;
