import { ActionReducerMapBuilder, createAsyncThunk } from '@reduxjs/toolkit';
import homeServices from '../homeServices';
import { IGetTrendingPayload, IHomeState } from '../types';

export const getTrending = createAsyncThunk<
  IGetTrendingPayload,
  undefined,
  ThunkAPIConfig
>('home/getTrending', async (_, { rejectWithValue }) => {
  try {
    const { data } = await homeServices.getTrending();

    return {
      data: data
    };
  } catch (error) {
    return rejectWithValue(error);
  }
});

export const getTrendingBuilder = (
  builder: ActionReducerMapBuilder<IHomeState>
) => {
  const { pending, fulfilled, rejected } = getTrending;
  builder
    .addCase(pending, draftState => {
      draftState.trending.loading = true;
    })
    .addCase(fulfilled, (draftState, action) => {
      draftState.trending.loading = false;
      draftState.trending.data = action.payload.data;
    })
    .addCase(rejected, draftState => {
      draftState.trending.loading = false;
    });
};
