import React from 'react';
import Login from '../pages/Login';
import Events from '../pages/Events';

export interface IRoute {
  path: string;
  component: React.ComponentType;
  exact?: boolean;
}

export enum RoutesNames {
  LOGIN = '/login',
  EVENTS = '/',
  NAVIGATE = '*'
}

export const publicRoutes: IRoute[] = [
  {path: RoutesNames.LOGIN, exact: true, component: Login}
];

export const privateRoutes: IRoute[] = [
  {path: RoutesNames.EVENTS, exact: true, component: Events}
];