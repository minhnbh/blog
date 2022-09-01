import React, { useEffect, useState } from 'react';
import { useField } from 'formik';
import { NumericTextBox, NumericTextBoxProps } from 'app/components';
import { isFunction } from 'lodash';

type ITextBoxControlProps = NumericTextBoxProps & {
  regex?: RegExp;
  onValueChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  suffix?: React.ReactElement | string;
  onSetValue?: () => void;
  changeOnBlur?: boolean;
};

const NumericTextBoxControl: React.FC<ITextBoxControlProps> = ({
  name,
  regex,
  className,
  changeOnBlur = false,
  onBlur: onBlurProp,
  onValueChange,
  ...props
}) => {
  const [{ value: valueProp, onChange, onBlur }, { error, touched }] = useField(
    name!
  );

  const [value, setValue] = useState(valueProp);

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = e => {
    const { value: newValue } = e.target;
    setValue(newValue);
    if (!changeOnBlur) {
      onChange(e);
    }

    if (isFunction(onValueChange)) {
      const changeValue = regex ? newValue.replace(regex, '') : newValue;
      onValueChange({
        ...e,
        target: {
          ...e.target,
          value: changeValue
        }
      });
    }
  };

  useEffect(() => {
    setValue(valueProp);
  }, [valueProp]);

  const handleBlur: React.FocusEventHandler<HTMLInputElement> = e => {
    if (changeOnBlur) {
      onChange(e);
    }
    onBlur(e);
    onBlurProp && onBlurProp(e);
  };

  useEffect(() => {
    setValue(value);
  }, [value]);

  return (
    <div className={className}>
      <NumericTextBox
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

export default NumericTextBoxControl;
