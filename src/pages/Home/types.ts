export interface IHomeState {
  editorPick: IEditorPickedPosts;
  inspiration: IInspirationPosts;
}

export interface IEditorPickedPosts {
  data: IPost[];
  loading: boolean;
}

export interface IPost {
  key: number;
  title: string;
  pathTitle: string;
  author?: string;
  imageAuthor?: string;
  category?: string;
  pathCategory?: string;
  date: string;
  image: string;
  description?: string;
}

export interface IGetEditorPickedPostsPayload {
  data: IPost[];
}

/*=================================================================*/
/*                      INSPIRATION                            
/*=================================================================*/

export interface IInspirationPosts {
  data: IPost[];
  loading: boolean;
}

export interface IGetInspirationPostsPayload {
  data: IPost[];
}
