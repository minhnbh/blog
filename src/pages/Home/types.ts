export interface IHomeState {
  editorPick: IEditorPickedPosts;
}

export interface IEditorPickedPosts {
  data: IPost[];
  loading: boolean;
}

export interface IPost {
  key: number;
  path: string;
  title: string;
  date: string;
  post: string;
}

export interface IGetEditorPickedPostsPayload {
  data: IPost[];
}
