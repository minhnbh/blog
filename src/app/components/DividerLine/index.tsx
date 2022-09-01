import classNames from 'classnames';
import React, { ReactNode } from 'react';

export interface IDividerLineProps {
  className?: string;
  children?: ReactNode;
}

const DividerLine: React.FC<IDividerLineProps> = ({ className, children }) => {
  return <div className={classNames('separator', className)}>{children}</div>;
};

export default DividerLine;
