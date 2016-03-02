import { Component } from 'angular2/core';
import { RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS } from 'angular2/router';

import BlogComponent from '../../../blog/components/blog/blog';

import 'material-design-lite';
import './material.min.css';
import './app.scss';

import template from 'html!./app.html';

@Component({
  selector  : 'ml-app',
  directives: [ROUTER_DIRECTIVES],
  providers : [ROUTER_PROVIDERS],
  template,
})

@RouteConfig([
  { path: '/', name: 'Blog', component: BlogComponent, useAsDefault: true },
])

export class AppComponent {
 }
