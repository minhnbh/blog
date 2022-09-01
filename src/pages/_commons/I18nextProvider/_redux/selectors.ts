import { createSelector } from '@reduxjs/toolkit';
import { II18nextProviderState } from '../types';

const getI18nextState = (states: RootState) => states.i18next;

export const selectedResource = createSelector(
  getI18nextState,
  (data: II18nextProviderState) => {
    return {
      lang: data.lang,
      data: data.resources[data.lang]
    };
  }
);
