import { MlRouterConfig } from '../';
import { BlogComponent } from './';

export const blogRoutes: MlRouterConfig = [
  {
    path: 'blog',
    component: BlogComponent,
    name: 'Blog',
    depth: 0,
    icon: 'book'
  },
];
