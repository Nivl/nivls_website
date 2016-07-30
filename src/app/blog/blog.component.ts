import { Component } from '@angular/core';

import { ArticleListComponent } from './article-list';
import { ArticleService } from './';

/**
 * Represent a full blog
 *
 * @export
 * @class BlogComponent
 */
@Component({
  moduleId: module.id,
  selector: 'ml-blog',
  templateUrl: 'blog.component.html',
  styleUrls: ['blog.component.css'],
  directives: [ArticleListComponent],
  providers: [ArticleService],
})
export class BlogComponent {
  constructor() {}
}
