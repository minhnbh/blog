import { Button, Modal, ModalBody, ModalFooter } from 'app/components';
import { COLORS } from 'app/constants/common';
import classNames from 'classnames';
import { isUndefined } from 'lodash';
import React, { useEffect, useMemo, useState } from 'react';
import {
  FaCheckCircle,
  FaExclamationTriangle,
  FaQuestionCircle,
  FaTimesCircle
} from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { confirmModalActions } from './_redux';
import { selectConfirmModalData } from './_redux/selectors';

const ConfirmModal: React.FC = () => {
  const {
    show: showProp,
    title,
    message,
    confirmBtnText,
    cancelBtnText,
    onConfirm,
    onCancel,
    imgSrc,
    variant = 'warning'
  } = useSelector(selectConfirmModalData);

  const [show, setShow] = useState(showProp);
  const dispatch = useDispatch();

  const handleConfirm = () => {
    onConfirm && onConfirm();
    dispatch(confirmModalActions.onClose());
  };

  const handleCancel = () => {
    dispatch(confirmModalActions.onClose());
    onCancel && onCancel();
  };

  const iconColor = useMemo(() => {
    switch (variant) {
      case 'danger':
        return COLORS.DANGER;
      case 'success':
        return COLORS.SUCCESS;
      case 'primary':
        return COLORS.PRIMARY;
      case 'warning':
        return COLORS.WARNING;
      default:
        return COLORS.DANGER;
    }
  }, [variant]);

  useEffect(() => {
    setShow(showProp);
  }, [showProp]);

  const IconView = useMemo(() => {
    switch (variant) {
      case 'danger':
        return <FaTimesCircle color={iconColor} size={60} />;
      case 'success':
        return <FaCheckCircle color={iconColor} size={60} />;
      case 'primary':
        return <FaQuestionCircle color={iconColor} size={60} />;
      case 'warning':
        return <FaExclamationTriangle color={iconColor} size={60} />;
      default:
        return <FaExclamationTriangle color={iconColor} size={60} />;
    }
  }, [iconColor, variant]);

  return (
    <Modal show={show}>
      <ModalBody className="text-center mt-24">
        {imgSrc ? <img src={imgSrc} /> : IconView}
        <h4
          className={classNames('text-center', {
            'mt-24': true,
            [`text-${variant}`]: !isUndefined(variant)
          })}
        >
          {title}
        </h4>
        <p className="mt-16 mb-0 text-center fs-16 color-gray-d01">{message}</p>
      </ModalBody>
      <ModalFooter>
        <div className="d-flex">
          <Button onClick={handleCancel}>{cancelBtnText}</Button>
          <Button onClick={handleConfirm} variant={variant}>
            {confirmBtnText}
          </Button>
        </div>
      </ModalFooter>
    </Modal>
  );
};

export default ConfirmModal;
