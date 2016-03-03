import { Component } from 'angular2/core';
import BlogCardComponent from '../card/card';

import './listing.scss';
import template from 'html!./listing.html';

@Component({
  selector  : 'ml-blog-listing',
  directives: [BlogCardComponent],
  template,
})

export default class BlogListingComponent {
}
