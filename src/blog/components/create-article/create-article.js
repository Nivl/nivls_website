import { Component } from 'angular2/core';
import MardownDirective from '../../../markdown/directives/markdown';

import './create-article.scss';
import template from 'html!./create-article.html';

@Component({
  selector  : 'ml-blog-create-article',
  directives: [MardownDirective],
  template,
})

export default class BlogCreateArticleComponent {
  constructor() {
    this.model = {};
  }
}
