import 'rxjs/add/operator/map';

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/observable';
import { Http } from '@angular/http';

import { environment } from '../../';
import { Article, ArticlePayload } from './article.models';

@Injectable()
export class ArticleBackend {
  private apiEndpoint = environment.api.url + '/blog/articles';

  constructor(private http: Http) {}

  get(): Observable<Article[]> {
    return this.http.get(`${this.apiEndpoint}`)
      .map(res => {
        let rawList: ArticlePayload[] = res.json().results;
        let articles: Article[] = rawList.map(el => new Article(el));

        return articles;
      });
  }

  // getBySlug(slug: string): Observable<Article> {
  //   return this.http.get(`${environment.api.url}/${volumeId}`)
  //     .map(res => res.json());
  // }
}
