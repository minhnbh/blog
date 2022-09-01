import React from 'react';
import ModalTitleBase from 'react-bootstrap/ModalTitle';
import { ModalTitleProps } from './types';

const ModalTitle: React.FC<ModalTitleProps> = ({ children }) => {
  return <ModalTitleBase>{children}</ModalTitleBase>;
};

export default ModalTitle;
