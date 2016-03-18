import { Injectable } from 'angular2/core';
import APIService from '../../../app/services/api';
import { Router } from 'angular2/router';

import moment from 'moment-timezone';
import Article from './article';

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
    return new Promise((resolve, reject) => {
      const articleDate = moment().set({
        year : ~~year,
        month: ~~month - 1,
        date : ~~day - 1,
      }).tz('Europe/London');

      const dateFrom = articleDate.startOf('day').toISOString();
      const dateTo = articleDate.endOf('day').toISOString();

      const params = {
        dateFrom: `filter[where][and][0][createdAt][gte]=${dateFrom}`,
        dateTo  : `filter[where][and][1][createdAt][lte]=${dateTo}`,
        slug    : `filter[where][and][2][slug]=${slug}`,
      };

      this._api.get(`Articles?${params.dateFrom}&${params.dateTo}&${params.slug}`)
      .subscribe((results) => {
        if (results.length) {
          const article = new Article(results[0], this._router);
          resolve(article);
        } else {
          reject(new Error('No Article Found.'));
        }
      }, (err) => {
        reject(err);
      });
    });
  }
}
