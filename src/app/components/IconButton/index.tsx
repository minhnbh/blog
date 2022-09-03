import classNames from 'classnames';
import React from 'react';

interface IconButtonProps {
  name: string;
  className?: string;
}

const IconButton: React.FC<IconButtonProps> = ({ name, className }) => {
  return (
    <button className={classNames('icon-button', className)}>
      <i className={name}></i>
    </button>
  );
};

export default IconButton;
