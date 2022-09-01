import {
  GET_TRANSLATE_DATA,
  IGetTranslateDataPayload,
  IGetTranslateDataArgs,
  II18nextProviderState
} from './../types';
import { ActionReducerMapBuilder, createAsyncThunk } from '@reduxjs/toolkit';
import i18nextServices from '../i18nextServices';

export const getTranslateData = createAsyncThunk<
  IGetTranslateDataPayload,
  IGetTranslateDataArgs,
  ThunkAPIConfig
>(GET_TRANSLATE_DATA, async ({ lang = 'en' }, thunkAPI) => {
  try {
    const { data } = await i18nextServices.getMultipleLanguage(lang);
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue({});
  }
});

export const getTranslateDataBuilder = (
  builder: ActionReducerMapBuilder<II18nextProviderState>
) => {
  const { pending, fulfilled, rejected } = getTranslateData;
  builder
    .addCase(pending, (draftState, action) => {
      draftState.loading = true;
    })
    .addCase(fulfilled, (draftState, action) => {
      const { lang, resource } = action.payload;
      draftState.resources[lang] = resource;
      draftState.lang = lang;
      draftState.loading = false;
    })
    .addCase(rejected, (draftState, action) => {
      draftState.loading = false;
    });
};
