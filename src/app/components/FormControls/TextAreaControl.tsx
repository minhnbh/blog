import React, { useEffect, useState } from 'react';
import { useField } from 'formik';
import { TextBox, TextBoxProps } from 'app/components';
import { isFunction } from 'lodash';

type ITextAreaControlProps = TextBoxProps & {
  regex?: RegExp;
  changeOnBlur?: boolean;
  rows?: number;
  onValueChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const TextAreaControl: React.FC<ITextAreaControlProps> = ({
  name = '',
  regex,
  className,
  changeOnBlur,
  rows = 3,
  onValueChange,
  ...props
}) => {
  const [{ value: valueProp, onChange, onBlur }, { error, touched }] =
    useField(name);

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

  const handleBlur: React.FocusEventHandler<HTMLInputElement> = e => {
    if (changeOnBlur) {
      onChange(e);
    }
    onBlur(e);
  };

  useEffect(() => {
    if (!touched) {
      setValue(valueProp);
    }
  }, [valueProp, touched]);

  return (
    <div className={className}>
      <TextBox
        {...props}
        as="textarea"
        rows={rows}
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

export default TextAreaControl;
