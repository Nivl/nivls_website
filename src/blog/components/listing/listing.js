import { Component } from 'angular2/core';
import BlogCardComponent from '../card/card';
import { ROUTER_DIRECTIVES } from 'angular2/router';

import ArticleManager from '../../models/article/article-manager';

import './listing.scss';
import template from 'html!./listing.html';

@Component({
  selector  : 'ml-blog-listing',
  directives: [BlogCardComponent, ROUTER_DIRECTIVES],
  providers : [ArticleManager],
  template,
})

export default class BlogListingComponent {
  articleManager;
  articles;

  constructor(articleManager) {
    this.articleManager = articleManager;

    this.fetchData();
  }

  async fetchData() {
    this.articles = await this.articleManager.getListing();
  }

  static get parameters() {
    return [[ArticleManager]];
  }
}
