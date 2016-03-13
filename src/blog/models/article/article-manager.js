import { Injectable } from 'angular2/core';
import APIService from '../../../app/services/api';
import Article from './article';

@Injectable()
export default class ArticleManager {
  api;

  constructor(api) {
    this.api = api;
  }

  static get parameters() {
    return [[APIService]];
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
      this.api.get('Articles')
      .subscribe((results) => {
        const articles = [];

        for (const res of results) {
          articles.push(new Article(res));
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
