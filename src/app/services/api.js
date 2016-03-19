import { Injectable } from 'angular2/core';
import { Http } from 'angular2/http';

import 'rxjs/add/operator/map';


@Injectable()
export default class APIService {
  http;
  domain;

  constructor(http) {
    this.http = http;
    this.domain = 'http://127.0.0.1:3000/';
  }

  getUrl(endpoint) {
    return this.domain + endpoint;
  }

  get(endpoint) {
    return this.http.get(this.getUrl(endpoint))
                    .map(res => res.json());
  }

  post(endpoint, data) {
    return this.http.post(this.getUrl(endpoint), data)
                    .map(res => res.json());
  }

  static get parameters() {
    return [[Http]];
  }
}
