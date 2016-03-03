import { Component } from 'angular2/core';
import BlogListingComponent from '../listing/listing';

import './blog.scss';
import template from 'html!./blog.html';

@Component({
  selector  : 'ml-blog',
  directives: [BlogListingComponent],
  template,
})

export default class BlogComponent {
}
