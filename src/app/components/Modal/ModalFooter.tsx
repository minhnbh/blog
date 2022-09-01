import React from 'react';
import ModalFooterBase from 'react-bootstrap/ModalFooter';
import { ModalFooterProps } from './types';
import { Button } from 'app/components';
import classnames from 'classnames';
import classes from 'app/utils/classes';
import { isFunction } from 'lodash';

const ModalFooter: React.FC<ModalFooterProps> = ({
  children,
  submitBtnText,
  submitBtnDisabled = false,
  cancelBtnText,
  align = 'center',
  className,
  border = false,
  onSubmit,
  onCancel
}) => {
  return (
    <ModalFooterBase
      className={classnames(
        {
          [classes.modal.footer]: true,
          'border-none': !border,
          'mt-24': border,
          [`justify-content-${align}`]: true
        },
        className
      )}
    >
      {children ? (
        children
      ) : (
        <>
          {cancelBtnText && (
            <Button
              onClick={() => {
                isFunction(onCancel) && onCancel();
              }}
            >
              {cancelBtnText}
            </Button>
          )}
          {submitBtnText && (
            <Button
              disabled={submitBtnDisabled}
              onClick={() => {
                isFunction(onSubmit) && onSubmit();
              }}
              size="lg"
              className="submit-btn"
              variant="submit"
            >
              {submitBtnText}
            </Button>
          )}
        </>
      )}
    </ModalFooterBase>
  );
};

export default ModalFooter;
