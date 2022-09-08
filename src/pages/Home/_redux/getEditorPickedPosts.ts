import { ActionReducerMapBuilder, createAsyncThunk } from '@reduxjs/toolkit';
import homeServices from '../homeServices';
import { IGetEditorPickedPostsPayload, IHomeState } from '../types';

export const getEditorPickedPosts = createAsyncThunk<
  IGetEditorPickedPostsPayload,
  undefined,
  ThunkAPIConfig
>('home/getEditorPickedPosts', async (_, { rejectWithValue }) => {
  try {
    const { data } = await homeServices.getEditorPosts();

    return {
      data: data
    };
  } catch (error) {
    return rejectWithValue(error);
  }
});

export const getEditorPickedPostsBuilder = (
  builder: ActionReducerMapBuilder<IHomeState>
) => {
  const { pending, fulfilled, rejected } = getEditorPickedPosts;
  builder
    .addCase(pending, draftState => {
      draftState.editorPick.loading = true;
    })
    .addCase(fulfilled, (draftState, action) => {
      draftState.editorPick.loading = false;
      draftState.editorPick.data = action.payload.data;
    })
    .addCase(rejected, draftState => {
      draftState.editorPick.loading = false;
    });
};
