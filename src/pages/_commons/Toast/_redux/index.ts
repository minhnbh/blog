import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ToastPosition } from 'react-bootstrap/esm/ToastContainer';
import { Variant } from 'react-bootstrap/esm/types';

export interface IToastState {
  show: boolean;
  message: string;
  variant: Variant;
  position: ToastPosition;
}

const initialStates: IToastState = {
  show: false,
  message: '',
  variant: 'primary',
  position: 'top-center'
};

const { actions, reducer } = createSlice({
  name: 'toastControl',
  initialState: initialStates,
  reducers: {
    addToast: (
      draftState,
      action: PayloadAction<{
        show: boolean;
        type: 'success' | 'error' | 'warning';
        message: string;
      }>
    ) => {
      draftState.show = action.payload.show;
      draftState.variant = (() => {
        switch (action.payload.type) {
          case 'success':
            return 'success';
          case 'error':
            return 'danger';
          case 'warning':
            return 'warning';
        }
      })();
      draftState.message = action.payload.message;
    },
    closeToast: draftState => {
      draftState.show = false;
    }
  }
});

export { actions as toastActions, reducer };
