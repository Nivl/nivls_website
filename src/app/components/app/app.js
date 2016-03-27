import { Component } from 'angular2/core';
import { RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS } from 'angular2/router';

import AppService from '../../services/app';

import BlogListingComponent from '../../../blog/components/listing/listing';
import BlogCreateArticleComponent from '../../../blog/components/create-article/create-article';
import BlogArticleComponent from '../../../blog/components/article/article';
import AboutComponent from '../../../about/components/about/about';
import ProjectsComponent from '../../../projects/components/projects/projects';

import 'material-design-lite';
import 'material-design-lite/dist/material.teal-amber.min.css';
import './app.scss';

import template from 'html!./app.html';

@Component({
  selector  : 'ml-app',
  directives: [ROUTER_DIRECTIVES],
  providers : [ROUTER_PROVIDERS, AppService],
  template,
})

@RouteConfig([
  { path: '/about', name: 'About', component: AboutComponent },
  { path: '/projects', name: 'Projects', component: ProjectsComponent },

  // Blog
  { path: '/blog/new', name: 'BlogCreateArticle', component: BlogCreateArticleComponent },
  { path: '/blog/:year/:month/:day/:slug', name: 'BlogArticle', component: BlogArticleComponent },
  { path: '/blog/:year/:month/:day', name: 'BlogByDay', component: BlogListingComponent },
  { path: '/blog/:year/:month', name: 'BlogByMonth', component: BlogListingComponent },
  { path: '/blog/:year', name: 'BlogByYear', component: BlogListingComponent },
  { path: '/', name: 'Blog', component: BlogListingComponent, useAsDefault: true },
])

export class AppComponent {
  constructor(appService) {
    appService.header.subscribe(type => this.onHeaderUpdated(type));
  }

  onHeaderUpdated(type) {
    console.info('onHeaderUpdated has not been implemented yet');
  }

  static get parameters() {
    return [[AppService]];
  }
}
