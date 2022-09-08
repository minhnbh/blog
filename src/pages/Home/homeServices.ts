import { EDITOR_POST } from './EditorPick/constants';

const homeServices = {
  getEditorPosts: () => {
    return Promise.resolve({
      data: EDITOR_POST
    });
  }
};

export default homeServices;
