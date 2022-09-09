import { ActionReducerMapBuilder, createAsyncThunk } from '@reduxjs/toolkit';
import homeServices from '../homeServices';
import { IGetHeroPopularPayload, IHomeState } from '../types';

export const getHeroPopular = createAsyncThunk<
  IGetHeroPopularPayload,
  undefined,
  ThunkAPIConfig
>('home/getHeroPopular', async (_, { rejectWithValue }) => {
  try {
    const { data } = await homeServices.getHeroPopular();

    return {
      data: data
    };
  } catch (error) {
    return rejectWithValue(error);
  }
});

export const getHeroPopularBuilder = (
  builder: ActionReducerMapBuilder<IHomeState>
) => {
  const { pending, fulfilled, rejected } = getHeroPopular;
  builder
    .addCase(pending, draftState => {
      draftState.popular.loading = true;
    })
    .addCase(fulfilled, (draftState, action) => {
      draftState.popular.loading = false;
      draftState.popular.data = action.payload.data;
    })
    .addCase(rejected, draftState => {
      draftState.popular.loading = false;
    });
};
