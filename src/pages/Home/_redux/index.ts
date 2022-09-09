import { createSlice } from '@reduxjs/toolkit';
import { IHomeState } from '../types';
import {
  getEditorPickedPosts,
  getEditorPickedPostsBuilder
} from './getEditorPickedPosts';
import {
  getInspirationPosts,
  getInspirationPostsBuilder
} from './getInspirationPosts';

const initialState: IHomeState = {
  editorPick: {
    data: [],
    loading: false
  },
  inspiration: {
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
    getInspirationPostsBuilder(builder);
  }
});

const combineActions = {
  ...actions,
  getEditorPickedPosts,
  getInspirationPosts
};

export { combineActions as homeActions, reducer };
