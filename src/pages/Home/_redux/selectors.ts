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

export const selectPostLarge = createSelector(
  getHomeState,
  (data: IHomeState) => data.postlarge
);

export const selectPopular = createSelector(
  getHomeState,
  (data: IHomeState) => data.popular
);

export const selectRecent = createSelector(
  getHomeState,
  (data: IHomeState) => data.recent
);

export const selectTrending = createSelector(
  getHomeState,
  (data: IHomeState) => data.trending
);

export const selectLatest = createSelector(
  getHomeState,
  (data: IHomeState) => data.latest
);

export const selectCategory = createSelector(
  getHomeState,
  (data: IHomeState) => data.categories
);
