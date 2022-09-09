import { ActionReducerMapBuilder, createAsyncThunk } from '@reduxjs/toolkit';
import homeServices from '../homeServices';
import { IGetHeroRecentPayload, IHomeState } from '../types';

export const getHeroRecent = createAsyncThunk<
  IGetHeroRecentPayload,
  undefined,
  ThunkAPIConfig
>('home/getHeroRecent', async (_, { rejectWithValue }) => {
  try {
    const { data } = await homeServices.getHeroRecent();

    return {
      data: data
    };
  } catch (error) {
    return rejectWithValue(error);
  }
});

export const getHeroRecentBuilder = (
  builder: ActionReducerMapBuilder<IHomeState>
) => {
  const { pending, fulfilled, rejected } = getHeroRecent;
  builder
    .addCase(pending, draftState => {
      draftState.recent.loading = true;
    })
    .addCase(fulfilled, (draftState, action) => {
      draftState.recent.loading = false;
      draftState.recent.data = action.payload.data;
    })
    .addCase(rejected, draftState => {
      draftState.recent.loading = false;
    });
};
