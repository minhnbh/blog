import { ActionReducerMapBuilder, createAsyncThunk } from '@reduxjs/toolkit';
import homeServices from '../homeServices';
import { IGetCategoryPayload, IHomeState } from '../types';

export const getCategory = createAsyncThunk<
  IGetCategoryPayload,
  undefined,
  ThunkAPIConfig
>('home/getCategory', async (_, { rejectWithValue }) => {
  try {
    const { data } = await homeServices.getCategory();

    return {
      data: data
    };
  } catch (error) {
    return rejectWithValue(error);
  }
});

export const getCategoryBuilder = (
  builder: ActionReducerMapBuilder<IHomeState>
) => {
  const { pending, fulfilled, rejected } = getCategory;
  builder
    .addCase(pending, draftState => {
      draftState.categories.loading = true;
    })
    .addCase(fulfilled, (draftState, action) => {
      draftState.categories.loading = false;
      draftState.categories.data = action.payload.data;
    })
    .addCase(rejected, draftState => {
      draftState.categories.loading = false;
    });
};
