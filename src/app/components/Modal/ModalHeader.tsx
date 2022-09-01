import React from 'react';
import ModalHeaderBase from 'react-bootstrap/ModalHeader';
import { ModalHeaderProps } from './types';
import classnames from 'classnames';
import { Icon } from 'app/components';

const ModalHeader: React.FC<ModalHeaderProps> = ({
  closeButton = false,
  border = false,
  onHide,
  children,
  backButton,
  onBack
}) => {
  const handleCloseButton = () => {
    onHide && onHide();
  };

  const handleGoBack = () => {
    onBack && onBack();
  };

  return (
    <ModalHeaderBase
      onHide={onHide}
      className={classnames({
        'border-none': !border
      })}
    >
      <div className="d-flex">
        {backButton && (
          <span className="cursor-pointer p-4 mr-16" onClick={handleGoBack}>
            <Icon name="arrow-left" />
          </span>
        )}
        {children}
      </div>
      {closeButton && (
        <button onClick={handleCloseButton} className="close-btn">
          <Icon name="close" />
        </button>
      )}
    </ModalHeaderBase>
  );
};

export default ModalHeader;
