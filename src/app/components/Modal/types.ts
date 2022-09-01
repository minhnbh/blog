import { ReactNode } from 'react';

export interface ModalProps {
  show: boolean;
  onShow?: () => void;
  onHide?: () => void;
  size?: 'sm' | 'lg' | 'xl';
  full?: boolean;
  loading?: boolean;
  classes?: {
    modal?: string;
    content?: string;
    backdrop?: string;
  };
  children?: ReactNode;
}

export interface ModalHeaderProps {
  closeButton?: boolean;
  onHide?: () => void;
  backButton?: boolean;
  onBack?: () => void;
  border?: boolean;
  closeClassName?: string;
  children?: ReactNode;
}

export interface ModalTitleProps {
  children?: ReactNode;
}

export interface ModalBodyProps {
  children?: ReactNode;
  className?: string;
  noPadding?: boolean;
}

export interface ModalFooterProps {
  children?: ReactNode;
  className?: string;
  align?: 'start' | 'center' | 'end';
  onCancel?: () => void;
  onSubmit?: () => void;
  submitBtnText?: string;
  submitBtnDisabled?: boolean;
  cancelBtnText?: string;
  border?: boolean;
}
