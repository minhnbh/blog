export interface IHomeState {
  editorPick: IEditorPickedPosts;
  inspiration: IInspirationPosts;
  postlarge: IHeroPostLarge;
  popular: IHeroPopular;
  recent: IHeroRecent;
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

/*=================================================================*/
/*                      HERO SECTION                            
/*=================================================================*/

export interface IHeroPostLarge {
  data: IPost;
  loading: boolean;
}

export interface IGetHeroPostLargePayload {
  data: IPost;
}

export interface IHeroPopular {
  data: IPost[];
  loading: boolean;
}
export interface IGetHeroPopularPayload {
  data: IPost[];
}

export interface IHeroRecent {
  data: IPost[];
  loading: boolean;
}

export interface IGetHeroRecentPayload {
  data: IPost[];
}
