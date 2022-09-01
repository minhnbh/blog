import React, { ReactNode } from 'react';

interface IfProps {
  condition: boolean;
  children?: ReactNode;
}

const If: React.FC<IfProps> = ({ condition, children }) => {
  if (condition) {
    return <>{children}</>;
  }

  return null;
};

export default If;
