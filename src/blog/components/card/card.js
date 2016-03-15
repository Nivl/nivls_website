import { Component } from 'angular2/core';
import { ROUTER_DIRECTIVES, Router } from 'angular2/router';

import './card.scss';
import template from 'html!./card.html';

@Component({
  selector  : 'ml-blog-card',
  directives: [ROUTER_DIRECTIVES],
  inputs    : ['article'],
  template,
})

export default class BlogCardComponent {
  article = {}; // @Input
}
