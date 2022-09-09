import { ActionReducerMapBuilder, createAsyncThunk } from '@reduxjs/toolkit';
import homeServices from '../homeServices';
import { IGetInspirationPostsPayload, IHomeState } from '../types';

export const getInspirationPosts = createAsyncThunk<
  IGetInspirationPostsPayload,
  undefined,
  ThunkAPIConfig
>('home/getInspirationPosts', async (_, { rejectWithValue }) => {
  try {
    const { data } = await homeServices.getInspirationPosts();

    return {
      data: data
    };
  } catch (error) {
    return rejectWithValue(error);
  }
});

export const getInspirationPostsBuilder = (
  builder: ActionReducerMapBuilder<IHomeState>
) => {
  const { pending, fulfilled, rejected } = getInspirationPosts;
  builder
    .addCase(pending, draftState => {
      draftState.inspiration.loading = true;
    })
    .addCase(fulfilled, (draftState, action) => {
      draftState.inspiration.loading = false;
      draftState.inspiration.data = action.payload.data;
    })
    .addCase(rejected, draftState => {
      draftState.inspiration.loading = false;
    });
};
