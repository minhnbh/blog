import { CATEGORY } from './Categories/constants';
import { EDITOR_POST } from './EditorPick/constants';
import {
  HERO_POPULAR_POST,
  HERO_POST_LARGE,
  HERO_RECENT_POST
} from './HeroSection/constants';
import { INSPIRATION_POST } from './Inspiration/constants';
import { LATEST_POST } from './Latest/constants';
import { TRENDING_POST } from './Trending/constants';

const homeServices = {
  getEditorPosts: () => {
    return Promise.resolve({
      data: EDITOR_POST
    });
  },
  getInspirationPosts: () => {
    return Promise.resolve({
      data: INSPIRATION_POST
    });
  },
  getHeroPostLarge: () => {
    return Promise.resolve({
      data: HERO_POST_LARGE
    });
  },
  getHeroPopular: () => {
    return Promise.resolve({
      data: HERO_POPULAR_POST
    });
  },
  getHeroRecent: () => {
    return Promise.resolve({
      data: HERO_RECENT_POST
    });
  },
  getTrending: () => {
    return Promise.resolve({
      data: TRENDING_POST
    });
  },
  getLatestPosts: () => {
    return Promise.resolve({
      data: LATEST_POST
    });
  },
  getCategory: () => {
    return Promise.resolve({
      data: CATEGORY
    });
  }
};

export default homeServices;
