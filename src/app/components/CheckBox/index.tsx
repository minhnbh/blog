import classNames from 'classnames';
import { isBoolean, isUndefined } from 'lodash';
import React, { ReactElement, useEffect, useState } from 'react';

export interface ICheckBoxProps {
  checked?: boolean;
  label: string | ReactElement;
  name?: string;
  className?: string;
  inputClassName?: string;
  onChange?: (value: boolean) => void;
}

const CheckBox: React.FC<ICheckBoxProps> = ({
  label,
  name,
  checked,
  className,
  inputClassName,
  onChange
}) => {
  const [isChecked, setIsChecked] = useState(checked || false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (isBoolean(checked)) return;
    const value = e.target.checked;
    setIsChecked(value);
    onChange && onChange(value);
  };

  useEffect(() => {
    if (isUndefined(checked)) return;
    setIsChecked(checked);
  }, [checked]);

  return (
    <div
      className={classNames('form-check align-items-center d-flex', className)}
    >
      <input
        className={classNames('form-check-input', inputClassName)}
        type="checkbox"
        value=""
        name={name}
        checked={isChecked}
        onChange={handleChange}
      />
      <label className="form-check-label ml-12">{label}</label>
    </div>
  );
};

export default CheckBox;
