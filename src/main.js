import 'zone.js';
import 'reflect-metadata';

import { HTTP_PROVIDERS } from 'angular2/http';
import { bootstrap }    from 'angular2/platform/browser';
import { AppComponent } from './app/components/app/app';
import APIService from './app/services/api';

bootstrap(AppComponent, [HTTP_PROVIDERS, APIService]);

// Reload MDL on dom changes
const observer = new MutationObserver((mutations) => {
  let upgrade = false;

  for (let i = 0; i < mutations.length; i++) {
    if (mutations[i].addedNodes.length > 0) {
      upgrade = true;
      break;
    }
  }

  if (upgrade && window.componentHandler) {
    window.componentHandler.upgradeDom();
  }
});

observer.observe(document, {
  childList: true,
  subtree  : true,
});
