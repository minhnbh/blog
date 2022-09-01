import classNames from 'classnames';
import React from 'react';

export interface IDividerLineProps {
  className?: string;
}

const DividerLine: React.FC<IDividerLineProps> = ({ className, children }) => {
  return <div className={classNames('separator', className)}>{children}</div>;
};

export default DividerLine;
