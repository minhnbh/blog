import React from 'react';
import { Alert, AlertProps } from 'react-bootstrap';
import classnames from 'classnames';

export interface IInlineMessageProps extends AlertProps {}

const InlineMessage: React.FC<IInlineMessageProps> = ({
  children,
  className,
  ...props
}) => {
  return (
    <Alert
      {...props}
      className={classnames('m-0 br-radius-8 bg-opacity-25', className)}
    >
      <div className="d-flex fs-14">{children}</div>
    </Alert>
  );
};

export default InlineMessage;
