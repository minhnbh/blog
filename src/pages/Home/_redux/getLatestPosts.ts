import { ActionReducerMapBuilder, createAsyncThunk } from '@reduxjs/toolkit';
import homeServices from '../homeServices';
import { IGetLatestPostsPayload, IHomeState } from '../types';

export const getLatestPosts = createAsyncThunk<
  IGetLatestPostsPayload,
  undefined,
  ThunkAPIConfig
>('home/getLatestPosts', async (_, { rejectWithValue }) => {
  try {
    const { data } = await homeServices.getLatestPosts();

    return {
      data: data
    };
  } catch (error) {
    return rejectWithValue(error);
  }
});

export const getLatestPostsBuilder = (
  builder: ActionReducerMapBuilder<IHomeState>
) => {
  const { pending, fulfilled, rejected } = getLatestPosts;
  builder
    .addCase(pending, draftState => {
      draftState.latest.loading = true;
    })
    .addCase(fulfilled, (draftState, action) => {
      draftState.latest.loading = false;
      draftState.latest.data = action.payload.data;
    })
    .addCase(rejected, draftState => {
      draftState.latest.loading = false;
    });
};
