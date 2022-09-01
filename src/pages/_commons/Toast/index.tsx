import React from 'react';
import { Toast as ToastBase, ToastBody, ToastContainer } from 'react-bootstrap';
import { InlineMessage } from 'app/components';
import { Variant } from 'react-bootstrap/esm/types';
import {
  selectToastShow,
  selectToastMessage,
  selectToastPosition,
  selectToastVariant
} from './_redux/selectors';
import { useDispatch, useSelector } from 'react-redux';
import { ToastPosition } from 'react-bootstrap/esm/ToastContainer';
import { toastActions } from './_redux';

const ToastControl: React.FC = () => {
  const dispatch = useDispatch();
  const show: boolean = useSelector(selectToastShow);
  const position: ToastPosition = useSelector(selectToastPosition);
  const message: string = useSelector(selectToastMessage);
  const variant: Variant = useSelector(selectToastVariant);

  const handleClose = () => {
    dispatch(toastActions.closeToast());
  };

  return (
    <ToastContainer position={position} className="mt-16">
      <ToastBase show={show} autohide onClose={handleClose}>
        <ToastBody className="p-0">
          <InlineMessage variant={variant}>{message}</InlineMessage>
        </ToastBody>
      </ToastBase>
    </ToastContainer>
  );
};

export default ToastControl;
