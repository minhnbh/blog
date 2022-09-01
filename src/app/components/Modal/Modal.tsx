import React, { useEffect, useState } from 'react';
import { Modal as ModalBase } from 'react-bootstrap';
import { ModalProps } from './types';
import classnames from 'classnames';
import classes from 'app/utils/classes';

const Modal: React.FC<ModalProps> = ({
  show: showProp,
  classes: classesProp,
  loading,
  full,
  children,
  size
}) => {
  const [show, setShow] = useState(showProp);
  const [isLoading, setIsLoading] = useState(loading);

  const {
    modal: modalClass,
    content: contentClass,
    backdrop: backdropClass
  } = classesProp || {};

  useEffect(() => {
    setShow(showProp);
  }, [showProp]);

  useEffect(() => {
    setIsLoading(loading);
  }, [loading]);

  return (
    <ModalBase
      show={show}
      size={size}
      centered
      scrollable
      className={classnames(
        {
          [classes.modal.root]: true,
          [classes.modal.full]: full
        },
        modalClass
      )}
      backdropClassName={backdropClass}
      contentClassName={classnames({ loading: isLoading }, contentClass)}
    >
      {children}
    </ModalBase>
  );
};

export default Modal;
