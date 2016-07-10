import { Component } from '@angular/core';

import { ArticleManager } from '../../models/article/article-manager';

@Component({
  selector  : 'ml-blog-listing',
  template: require('./listing.html'),
  styles: [require('./listing.scss')],
  providers: [ArticleManager],
})

export default class BlogListingComponent {

}
