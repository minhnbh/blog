import React from 'react';
import classnames from 'classnames';

export interface LazyLoadingFallbackProps {
  classNames?: string;
}

const LazyLoadingFallback: React.FC<LazyLoadingFallbackProps> = ({
  classNames
}) => {
  return <div className={classnames('vh-100 loading', classNames)}></div>;
};

export default LazyLoadingFallback;
