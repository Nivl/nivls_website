import { Route } from '@angular/router';

export interface MlRoute extends Route {
  name: string;
  depth: number;
  icon?: string;
};

export declare type MlRouterConfig = MlRoute[];
