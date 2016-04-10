import { Injectable } from 'angular2/core';

import APIService from '../../../app/services/api';
import LocalStorage from '../../../storage/local-storage';
import User from './user';

@Injectable()
export default class UserManager {
  _api; // @input
  _isLogged;
  _currentUser = null;

  constructor(api) {
    this._api = api;
  }

  static get parameters() {
    return [[APIService]];
  }

  /**
   * Login a user
   *
   * @param  {String} email     email address of the user
   * @param  {String} password  password of the user
   * @return Promise
   */
  async login(email, password) {
    return new Promise((resolve, reject) => {
      this._api.post('Users/login', { email, password })
      .subscribe((result) => {
        this._currentUser = User.fromToken(email, result);
        LocalStorage.set('currentUser', this._currentUser);
        this._isLogged = true;
        resolve(result);
      }, (err) => {
        reject(err);
      });
    });
  }

  /**
   * Check if the current user is logged or not
   *
   * @return {Boolean} true if the user is logged, false otherwise
   */
  isLogged() {
    if (typeof this._isLogged === 'undefined') {
      this._currentUser = LocalStorage.get('currentUser');
      this._isLogged = !!this._currentUser;
    }

    return this._isLogged;
  }
}
