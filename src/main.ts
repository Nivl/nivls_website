import { bootstrap } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { disableDeprecatedForms, provideForms } from '@angular/forms';
import { HTTP_PROVIDERS } from '@angular/http';
import { provideStore } from '@ngrx/store';

import {
  AppComponent,
  appRouterProviders,
  environment,
  appReducers,
  appRootProviders
} from './app/';

if (environment.production) {
  enableProdMode();
}

bootstrap(AppComponent, [
  disableDeprecatedForms(),
  provideForms(),
  HTTP_PROVIDERS,
  appRouterProviders,
  provideStore(appReducers),
  ...appRootProviders,
]);
