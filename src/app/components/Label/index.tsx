import React from 'react';
import { FormLabel as FormLabelBase } from 'react-bootstrap';
import classes from 'app/utils/classes';
import classnames from 'classnames';
import { isUndefined } from 'lodash';
import { Icon } from 'app/components';

export interface FormLabelProps {
  required?: boolean;
  error?: MagicKeyValue;
  className?: string;
}

const FormLabel: React.FC<FormLabelProps> = ({
  required,
  children,
  className,
  error
}) => {
  return (
    <FormLabelBase
      className={classnames(
        classes.textBox.label,
        { 'text-danger': !isUndefined(error) },
        className
      )}
    >
      {children}
      {required && <span className="ml-4 text-danger">*</span>}
      {error && <Icon name="alert-circle" className="ml-4" />}
    </FormLabelBase>
  );
};

export default FormLabel;
