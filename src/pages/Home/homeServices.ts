import { EDITOR_POST } from './EditorPick/constants';
import {
  HERO_POPULAR_POST,
  HERO_POST_LARGE,
  HERO_RECENT_POST
} from './HeroSection/constants';
import { INSPIRATION_POST } from './Inspiration/constants';

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
  }
};

export default homeServices;
