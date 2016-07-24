import { MlRouterConfig } from '../';

import { AboutComponent } from './';

export const aboutRoutes: MlRouterConfig = [
  {
    path: 'about',
    component: AboutComponent,
    name: 'About',
    depth: 0,
    icon: 'face'
  },
];
