import { IToastState } from './index';
import { createSelector } from '@reduxjs/toolkit';

const getToastStates = (states: RootState) => states.toast;

export const selectToastShow = createSelector(
  getToastStates,
  (data: IToastState) => data.show
);

export const selectToastMessage = createSelector(
  getToastStates,
  (data: IToastState) => data.message
);

export const selectToastVariant = createSelector(
  getToastStates,
  (data: IToastState) => data.variant
);

export const selectToastPosition = createSelector(
  getToastStates,
  (data: IToastState) => data.position
);
