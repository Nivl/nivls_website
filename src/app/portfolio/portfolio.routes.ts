import { MlRouterConfig } from '../';
import { PortfolioComponent } from './';

export const portfolioRoutes: MlRouterConfig = [
  {
    path: 'projects',
    component: PortfolioComponent,
    name: 'Projects',
    depth: 0,
    icon: 'apps'
  },
];
