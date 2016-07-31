import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/observable';
import { Store } from '@ngrx/store';

import { Article } from './article.models';
import { ArticleActions } from './article.actions';
import { ArticleBackend } from './article.backend';
import { AppState } from './../..';

@Injectable()
export class ArticleService {
  constructor(
    private store: Store<AppState>,
    private articleBackend: ArticleBackend,
    private articleActions: ArticleActions
  ) { }

  /**
   * Return the article list from the current state
   *
   * @returns {Observable<Article[]>}
   */
  get(): Observable<Article[]> {
    return this.store.select((state) => state['blog-articles']);
  }

  /**
   * Clean the current state, and push new data from the API
   */
  refresh() {
    this.store.dispatch(this.articleActions.clear());

    this.articleBackend.get().subscribe((data: Article[]) => {
      data.forEach(elem => this.store.dispatch(this.articleActions.add(elem)));
    });
  }

  addOne(article: Article) {

  }

  removeById(id: string) {

  }
}
