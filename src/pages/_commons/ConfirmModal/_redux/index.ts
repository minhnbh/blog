import { ReactNode } from 'react';
import { BtnVariants } from 'app/components/Button/constant';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type ConfirmModalVariant = 'success' | 'primary' | 'warning' | 'danger';

export interface IConfirmModalStates {
  show: boolean;
  title: string | ReactNode;
  message: string | ReactNode;
  confirmBtnText: string;
  cancelBtnText: string;
  onConfirm: Function;
  onCancel: Function;
  confirmBtnVariant?: BtnVariants;
  imgSrc?: string;
  variant?: ConfirmModalVariant;
}

const initialState: IConfirmModalStates = {
  show: false,
  title: '',
  message: '',
  confirmBtnText: 'Confirm',
  cancelBtnText: 'Cancel',
  variant: 'warning',
  onConfirm: () => {},
  onCancel: () => {}
};

const { actions, reducer } = createSlice({
  name: 'ConfirmModal',
  initialState,
  reducers: {
    onConfirm: (
      draftState,
      actions: PayloadAction<{
        title: string | ReactNode;
        message: string | ReactNode;
        confirmBtnText?: string;
        cancelBtnText?: string;
        onConfirm?: Function;
        onCancel?: Function;
        imgSrc?: string;
        variant?: ConfirmModalVariant;
      }>
    ) => {
      const {
        title,
        message,
        confirmBtnText,
        cancelBtnText,
        onConfirm,
        onCancel,
        imgSrc,
        variant = 'warning'
      } = actions.payload;
      return {
        show: true,
        title,
        message,
        confirmBtnText: confirmBtnText || draftState.confirmBtnText,
        cancelBtnText: cancelBtnText || draftState.cancelBtnText,
        onConfirm: onConfirm || draftState.onConfirm,
        onCancel: onCancel || draftState.onCancel,
        imgSrc: imgSrc ? '/images/' + imgSrc : undefined,
        variant
      };
    },
    onClose: draftState => {
      draftState.show = false;
    }
  }
});

export { actions as confirmModalActions, reducer };
