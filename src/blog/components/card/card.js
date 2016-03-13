import { Component } from 'angular2/core';

import './card.scss';
import template from 'html!./card.html';

@Component({
  selector: 'ml-blog-card',
  inputs  : ['article'],
  template,
})

export default class BlogCardComponent {
  article = {};

  // ngOnInit() {
  //   this.article = article;
  // }
}
