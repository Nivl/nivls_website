import { Injectable } from '@angular/core';
import { Http, RequestOptionsArgs, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs';

import 'rxjs/add/operator/map';
import '../types';

@Injectable()
export default class APIService {
  private http: Http;
  private domain: string = 'http://127.0.0.1:5000/';

  constructor(http: Http) {
    this.http = http;
  }

  public getUrl(endpoint: string): string {
    return this.domain + endpoint;
  }

  public get(endpoint: string): Observable<Response> {
    return this.http.get(this.getUrl(endpoint))
                    .map(res => res.json());
  }

  public post(endpoint: string, data: Dictionary = {}): Observable<Response> {
    const body: string = JSON.stringify(data);

    return this.http.post(this.getUrl(endpoint), body, this._getOptions())
                    .map(res => res.json());
  }

  public put(endpoint: string, data: Dictionary = {}): Observable<Response> {
    const body: string = JSON.stringify(data);

    return this.http.put(this.getUrl(endpoint), body, this._getOptions())
                    .map(res => res.json());
  }

  private _getOptions(): RequestOptionsArgs {
    const headers: Headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return { headers };
  }
}
