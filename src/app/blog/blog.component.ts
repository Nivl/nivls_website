import { Component } from '@angular/core';
import { Observable } from 'rxjs';

import { ArticleListComponent } from './article-list';
import { ArticleService, Article } from './article';

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
  public articles$: Observable<Article[]>;

  constructor(
    private articleService: ArticleService
  ) {
    this.articleService.refresh();
    this.articles$ = this.articleService.get();
  }
}
