import { Component } from 'angular2/core';
import BlogCardComponent from '../card/card';
import { ROUTER_DIRECTIVES } from 'angular2/router';

import './listing.scss';
import template from 'html!./listing.html';

@Component({
  selector  : 'ml-blog-listing',
  directives: [BlogCardComponent, ROUTER_DIRECTIVES],
  template,
})

export default class BlogListingComponent {
}
