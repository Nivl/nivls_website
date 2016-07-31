/* tslint:disable:member-ordering */

import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';

import { Article } from './article.models';

@Injectable()
export class ArticleActions {
    static CLEAR_ARTICLES = 'CLEAR_BLOG_ARTICLES';
    clear(): Action {
      return {
        type: ArticleActions.CLEAR_ARTICLES,
      };
    }

  static ADD_ARTICLE = 'ADD_BLOG_ARTICLE';
    add(article: Article): Action {
      return {
        type: ArticleActions.ADD_ARTICLE,
        payload: article
      };
    }

    static UPDATE_ARTICLE = 'UPDATE_BLOG_ARTICLE';
    update(article: Article): Action {
      return {
        type: ArticleActions.UPDATE_ARTICLE,
        payload: article
      };
    }

    static DELETE_ARTICLE = 'DELETE_BLOG_ARTICLE';
    delete(article: Article): Action {
      return {
        type: ArticleActions.DELETE_ARTICLE,
        payload: article
      };
    }
}
