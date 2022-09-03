import React from 'react';
import { ReactNode } from 'react';

export interface IRoute {
  key: string;
  path: string;
  title: string;
  Component?: React.FC<unknown>;
  exact?: boolean;
  routes?: IRoute[];
  Icon?: string | ReactNode;
}

export const EMPTY_COMPONENT: React.FC<unknown> = () => <div></div>;

export const BLOG_ROUTE: IRoute[] = [
  {
    key: 'blog/travel',
    path: 'travel',
    title: 'txt_travel',
    Component: EMPTY_COMPONENT
  },
  {
    key: 'blog/food',
    path: 'food',
    title: 'txt_food',
    Component: EMPTY_COMPONENT
  }
];

export const TOP_MENU_ROUTE: IRoute[] = [
  {
    key: 'home',
    path: 'home',
    title: 'txt_home',
    Component: EMPTY_COMPONENT
  },
  {
    key: 'blog',
    path: 'blog',
    title: 'txt_blog',
    Component: EMPTY_COMPONENT,
    routes: BLOG_ROUTE
  },
  {
    key: 'contact',
    path: 'contact',
    title: 'txt_contact',
    Component: EMPTY_COMPONENT
  }
];

export const SOCIAL_LINKS = [
  {
    key: 'facebook',
    name: 'Facebook',
    icon: 'fab fa-facebook-f',
    link: 'https://facebook.com'
  },
  {
    key: 'twitter',
    name: 'Twitter',
    icon: 'fab fa-twitter',
    link: 'https://twitter.com'
  },
  {
    key: 'instagram',
    name: 'Instagram',
    icon: 'fab fa-instagram',
    link: 'https://instagram.com'
  },
  {
    key: 'youtube',
    name: 'Youtube',
    icon: 'fab fa-youtube',
    link: 'https://youtube.com'
  }
];
