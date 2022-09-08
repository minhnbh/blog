import React from 'react';
import {} from 'react-icons/fa';
import { IconType } from 'react-icons';
import Home from 'pages/Home';

export interface IRoute {
  key: string;
  path: string;
  title?: string;
  Component: React.FC<any>;
  exact?: boolean;
  routes?: IRoute[];
  Icon?: IconType;
  showInMainNav?: boolean;
  index?: boolean;
}

export const EMPTY_COMPONENT: React.FC = () => <div></div>;

export const MAIN_NAVIGATION: IRoute[] = [
  {
    key: 'home',
    path: '/home',
    Component: Home
  }
];

export const ADMIN_MAIN_NAVIGATION: IRoute[] = [];

export const AUTH_NAVIGATION: IRoute[] = [];
