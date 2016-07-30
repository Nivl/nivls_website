import { Component, OnInit , Input} from '@angular/core';
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
  selector: 'app-article',
  templateUrl: 'article.component.html',
  styleUrls: ['article.component.css']
})
export class ArticleComponent implements OnInit {

  @Input() article: Article;

  constructor() {}

  ngOnInit() {
  }
}
