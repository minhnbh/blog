import { EDITOR_POST } from './EditorPick/constants';
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
  }
};

export default homeServices;
