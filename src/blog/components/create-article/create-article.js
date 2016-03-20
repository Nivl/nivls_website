import { Component } from 'angular2/core';
import MardownDirective from '../../../markdown/directives/markdown';
import DropzoneComponent from '../../../dropzone/components/dropzone';
import ArticleManager from '../../models/article/article-manager';
import Article from '../../models/article/article';

import './create-article.scss';
import template from 'html!./create-article.html';

@Component({
  selector  : 'ml-blog-create-article',
  directives: [MardownDirective, DropzoneComponent],
  providers : [ArticleManager],
  template,
})

export default class BlogCreateArticleComponent {
  article;
  uploadEndpoint = '#';
  _articleManager;

  constructor(articleManager) {
    this._articleManager = articleManager;
    this.article = new Article();
  }

  save() {
    this._articleManager.save();
  }

  static get parameters() {
    return [[ArticleManager]];
  }
}
