import { Injectable } from '@angular/core';
import { Http, RequestOptionsArgs, Headers } from '@angular/http';

import 'rxjs/add/operator/map';

@Injectable()
export default class APIService {
  private http: Http;
  private domain: string = 'http://127.0.0.1:5000/';

  constructor(http: Http) {
    this.http = http;
  }

  public getUrl(endpoint) {
    return this.domain + endpoint;
  }

  public get(endpoint) {
    return this.http.get(this.getUrl(endpoint))
                    .map(res => res.json());
  }

  public post(endpoint, data) {
    const body = JSON.stringify(data);

    return this.http.post(this.getUrl(endpoint), body, this._getOptions())
                    .map(res => res.json());
  }

  public put(endpoint, data) {
    const body = JSON.stringify(data);

    return this.http.put(this.getUrl(endpoint), body, this._getOptions())
                    .map(res => res.json());
  }

  private _getOptions(): RequestOptionsArgs {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

    return {
      headers,
    };
  }
}