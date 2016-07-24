import { provideRouter, RouterConfig } from '@angular/router';
import { MlRouterConfig } from './';

import { blogRoutes } from './blog';
import { aboutRoutes } from './about';
import { portfolioRoutes } from './portfolio';

import { PageNotFoundComponent } from './page-not-found';

export const appRouteList: MlRouterConfig = [
  ...blogRoutes,
  ...aboutRoutes,
  ...portfolioRoutes,
];

const routes: RouterConfig = [
  {
    path: '',
    redirectTo: '/blog',
    pathMatch: 'full'
  },

  ...appRouteList,

  { path: '**', component: PageNotFoundComponent }
];

export const appRouterProviders = [
  provideRouter(routes)
];
