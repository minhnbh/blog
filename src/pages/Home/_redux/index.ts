import { createSlice } from '@reduxjs/toolkit';
import { IHomeState } from '../types';
import {
  getEditorPickedPosts,
  getEditorPickedPostsBuilder
} from './getEditorPickedPosts';

const initialState: IHomeState = {
  editorPick: {
    data: [],
    loading: false
  }
};

const { actions, reducer } = createSlice({
  name: 'home',
  initialState,
  reducers: {},
  extraReducers: builder => {
    getEditorPickedPostsBuilder(builder);
  }
});

const combineActions = {
  ...actions,
  getEditorPickedPosts
};

export { combineActions as homeActions, reducer };
