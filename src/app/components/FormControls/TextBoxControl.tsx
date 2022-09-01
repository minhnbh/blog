import React, { useEffect, useState } from 'react';
import { useField } from 'formik';
import { TextBox, TextBoxProps } from 'app/components';
import { isFunction, isNull, isUndefined } from 'lodash';

type ITextBoxControlProps = TextBoxProps & {
  changeOnBlur?: boolean;
  onValueChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const TextBoxControl: React.FC<ITextBoxControlProps> = ({
  name = '',
  className,
  changeOnBlur,
  onValueChange,
  ...props
}) => {
  const [{ value: valueProp, onChange, onBlur }, { error, touched }] =
    useField(name);

  const [value, setValue] = useState(valueProp ?? '');

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = e => {
    const { value: newValue } = e.target;
    setValue(newValue);
    if (!changeOnBlur) {
      onChange(e);
    }

    if (isFunction(onValueChange)) {
      onValueChange({
        ...e,
        target: {
          ...e.target,
          value: newValue
        }
      });
    }
  };

  const handleBlur: React.FocusEventHandler<HTMLInputElement> = e => {
    if (changeOnBlur) {
      onChange(e);
    }
    onBlur(e);
  };

  useEffect(() => {
    if (isUndefined(valueProp) || isNull(valueProp)) return;
    setValue(valueProp);
  }, [valueProp]);

  return (
    <div className={className}>
      <TextBox
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

export default TextBoxControl;
