import React from 'react';
import { FormLabel as FormLabelBase } from 'react-bootstrap';
import classes from 'app/utils/classes';
import classnames from 'classnames';
import { Tooltip } from '..';

export interface FormLabelProps {
  required?: boolean;
  error?: boolean;
  className?: string;
  readOnly?: boolean;
  readOnlyText?: string;
}

const FormLabel: React.FC<FormLabelProps> = ({
  required,
  children,
  className,
  readOnly,
  readOnlyText,
  error
}) => {
  return (
    <FormLabelBase
      className={classnames(
        classes.textBox.label,
        { 'text-danger': error },
        className
      )}
    >
      {children}
      {required && <span className="ml-4 text-danger">*</span>}
      {readOnly && readOnlyText && (
        <Tooltip message={readOnlyText} variant="secondary" trigger="hover">
          <span className="ml-4 text-danger">ⓘ</span>
        </Tooltip>
      )}
    </FormLabelBase>
  );
};

export default FormLabel;
