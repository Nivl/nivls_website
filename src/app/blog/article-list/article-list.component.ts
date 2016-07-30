import { Component, OnInit } from '@angular/core';

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
  styleUrls: ['article-list.component.css']
})
export class ArticleListComponent implements OnInit {

  constructor() {}

  ngOnInit() {
  }

}
