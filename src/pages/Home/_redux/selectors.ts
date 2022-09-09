import { createSelector } from '@reduxjs/toolkit';
import { IHomeState } from '../types';

export const getHomeState = (states: RootState) => states.home;

export const selectEditorPick = createSelector(
  getHomeState,
  (data: IHomeState) => data.editorPick
);

export const selectInspiration = createSelector(
  getHomeState,
  (data: IHomeState) => data.inspiration
);
