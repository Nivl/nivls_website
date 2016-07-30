import 'rxjs/add/operator/map';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { environment } from '../../';
import { Article } from './article.models';

@Injectable()
export class ArticleService {
  private apiEndpoint = environment.api.url + '/blog-article';

  constructor(private http: Http) {}

  get(): Observable<Article[]> {
    return this.http.get(`${this.apiEndpoint}`)
      .map(res => res.json().items);
  }

  // getBySlug(slug: string): Observable<Article> {
  //   return this.http.get(`${environment.api.url}/${volumeId}`)
  //     .map(res => res.json());
  // }
}
