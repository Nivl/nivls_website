import 'zone.js';
import 'reflect-metadata';

import { bootstrap }    from 'angular2/platform/browser';
import { AppComponent } from './app/components/app/app';

bootstrap(AppComponent);

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
