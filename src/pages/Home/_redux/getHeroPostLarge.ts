import { ActionReducerMapBuilder, createAsyncThunk } from '@reduxjs/toolkit';
import homeServices from '../homeServices';
import { IGetHeroPostLargePayload, IHomeState } from '../types';

export const getHeroPostLarge = createAsyncThunk<
  IGetHeroPostLargePayload,
  undefined,
  ThunkAPIConfig
>('home/getHeroPostLarge', async (_, { rejectWithValue }) => {
  try {
    const { data } = await homeServices.getHeroPostLarge();

    return {
      data: data
    };
  } catch (error) {
    return rejectWithValue(error);
  }
});

export const getHeroPostLargeBuilder = (
  builder: ActionReducerMapBuilder<IHomeState>
) => {
  const { pending, fulfilled, rejected } = getHeroPostLarge;
  builder
    .addCase(pending, draftState => {
      draftState.postlarge.loading = true;
    })
    .addCase(fulfilled, (draftState, action) => {
      draftState.postlarge.loading = false;
      draftState.postlarge.data = action.payload.data;
    })
    .addCase(rejected, draftState => {
      draftState.postlarge.loading = false;
    });
};
