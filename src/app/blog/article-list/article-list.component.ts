import { Component, Input} from '@angular/core';
import { Article, ArticleComponent } from '../article';

/**
 * Represent a list of blog articles
 *
 * @export
 * @class ArticleListComponent
 * @implements {OnInit}
 */
@Component({
  moduleId: module.id,
  selector: 'ml-article-list',
  templateUrl: 'article-list.component.html',
  styleUrls: ['article-list.component.css'],
  directives: [ArticleComponent]
})
export class ArticleListComponent {
  @Input() articles: Article[];

  constructor() {}
}
