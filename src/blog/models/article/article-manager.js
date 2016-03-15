import { Injectable } from 'angular2/core';
import APIService from '../../../app/services/api';
import Article from './article';
import { Router } from 'angular2/router';

@Injectable()
export default class ArticleManager {
  _api; // @input
  _router; // @input

  constructor(api, router) {
    this._api = api;
    this._router = router;
  }

  static get parameters() {
    return [[APIService], [Router]];
  }

  /**
   * Fetch a list of Articles
   *
   * @param  {[type]} year  Year filter
   * @param  {[type]} month Month filter
   * @param  {[type]} day   Day filter
   * @return Promise
   */
  async getListing(year, month, day) {
    return new Promise((resolve, reject) => {
      this._api.get('Articles')
      .subscribe((results) => {
        const articles = [];

        for (const res of results) {
          articles.push(new Article(res, this._router));
        }

        resolve(articles);
      }, (err) => {
        reject(err);
      });
    });
  }

  async getByDateAndSlug(year, month, day, slug) {

  }
}
