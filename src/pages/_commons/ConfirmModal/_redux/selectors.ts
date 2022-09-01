import { createSelector } from '@reduxjs/toolkit';
import { IConfirmModalStates } from '.';

const confirmModalStates = (states: RootState) => states.confirmModal || {};

export const selectConfirmModalShow = createSelector(
  confirmModalStates,
  (data: IConfirmModalStates) => data.show
);

export const selectConfirmModalData = createSelector(
  confirmModalStates,
  (data: IConfirmModalStates) => data
);
