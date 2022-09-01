import { getTranslateData, getTranslateDataBuilder } from './getTranslateData';
import { II18nextProviderState, ILang } from './../types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: II18nextProviderState = {
  lang: 'en',
  resources: {},
  loading: false
};

const { actions, reducer } = createSlice({
  name: 'i18next',
  initialState,
  reducers: {
    changeLang: (draftState, action: PayloadAction<ILang>) => {
      draftState.lang = action.payload.lang;
    }
  },
  extraReducers: builder => {
    getTranslateDataBuilder(builder);
  }
});

const combineActions = {
  ...actions,
  getTranslateData
};

export { combineActions as i18nextActions, reducer };
