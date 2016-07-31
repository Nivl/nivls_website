import { Component, Input } from '@angular/core';
import { Article } from './article.models';

/**
 * Represent a single blog article
 *
 * @export
 * @class ArticleComponent
 * @implements {OnInit}
 */
@Component({
  moduleId: module.id,
  selector: 'ml-article',
  templateUrl: 'article.component.html',
  styleUrls: ['article.component.css']
})
export class ArticleComponent {
  @Input() article: Article;

  constructor() {}
}
