import { createSlice } from '@reduxjs/toolkit';
import { IHomeState } from '../types';
import { getCategory, getCategoryBuilder } from './getCategory';
import {
  getEditorPickedPosts,
  getEditorPickedPostsBuilder
} from './getEditorPickedPosts';
import { getHeroPopular, getHeroPopularBuilder } from './getHeroPopular';
import { getHeroPostLarge, getHeroPostLargeBuilder } from './getHeroPostLarge';
import { getHeroRecent, getHeroRecentBuilder } from './getHeroRecent';
import {
  getInspirationPosts,
  getInspirationPostsBuilder
} from './getInspirationPosts';
import { getLatestPosts, getLatestPostsBuilder } from './getLatestPosts';
import { getTrending, getTrendingBuilder } from './getTrending';

const initialState: IHomeState = {
  editorPick: {
    data: [],
    loading: false
  },
  inspiration: {
    data: [],
    loading: false
  },
  postlarge: {
    data: { key: 0, title: '', pathTitle: '', date: '', image: '' },
    loading: false
  },
  popular: {
    data: [],
    loading: false
  },
  recent: {
    data: [],
    loading: false
  },
  trending: {
    data: [],
    loading: false
  },
  latest: {
    data: [],
    loading: false
  },
  categories: {
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
    getHeroPostLargeBuilder(builder);
    getHeroPopularBuilder(builder);
    getHeroRecentBuilder(builder);
    getTrendingBuilder(builder);
    getLatestPostsBuilder(builder);
    getCategoryBuilder(builder);
  }
});

const combineActions = {
  ...actions,
  getEditorPickedPosts,
  getInspirationPosts,
  getHeroPostLarge,
  getHeroPopular,
  getHeroRecent,
  getTrending,
  getLatestPosts,
  getCategory
};

export { combineActions as homeActions, reducer };
