import { Component } from 'angular2/core';
import { RouteParams } from 'angular2/router';

import ArticleManager from '../../models/article/article-manager';
import MardownDirective from '../../../markdown/directives/markdown';

import './article.scss';
import template from 'html!./article.html';

@Component({
  selector : 'ml-blog-article',
  providers: [ArticleManager],
  directives: [MardownDirective],
  template,
})

export default class BlogArticleComponent {
  article = {}; // @Input
  _articleManager;
  _routeParams;

  constructor(articleManager, routeParams) {
    this._articleManager = articleManager;
    this._routeParams = routeParams;

    this.fetcArticle();
  }

  async fetcArticle() {
    const day = this._routeParams.get('day');
    const month = this._routeParams.get('month');
    const year = this._routeParams.get('year');
    const slug = this._routeParams.get('slug');

    this.article = await this._articleManager.getByDateAndSlug(year, month, day, slug);
  }

  static get parameters() {
    return [[ArticleManager], [RouteParams]];
  }
}
