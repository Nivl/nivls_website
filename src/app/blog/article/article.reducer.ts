import { Action, ActionReducer } from '@ngrx/store';

import { ArticleActions } from './article.actions';
import { Article } from './article.models';

export const articleReducer: ActionReducer<Article[]> = (state: Article[] = [], action: Action) => {
  let actionMap = {};
  actionMap[ArticleActions.CLEAR_ARTICLES] = clear;
  actionMap[ArticleActions.ADD_ARTICLE] = add;
  actionMap[ArticleActions.UPDATE_ARTICLE] = update;
  actionMap[ArticleActions.DELETE_ARTICLE] = remove;

  return (action.type in actionMap) ? (actionMap[action.type](state, action)) : (state);
};

function clear(state: Article[], action: Action): Article[] {
  return [];
}

function add(state: Article[], action: Action): Article[] {
  return [...state, action.payload];
}

function update(state: Article[], action: Action): Article[] {
  return state.map(article => {
    return (article.id === action.payload.id) ? (new Article(action.payload)) : (article);
  });
}

function remove(state: Article[], action: Action): Article[] {
  return state.filter(article => article.id !== action.payload.id);
}
