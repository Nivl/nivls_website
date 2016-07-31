/* tslint:disable:no-unused-variable */

import {
  beforeEach, beforeEachProviders,
  describe, xdescribe,
  expect, it, xit,
  async, inject,
  addProviders
} from '@angular/core/testing';

import { Article } from './article.models';
const fulArticle = require('./fixtures/full_article.json');

describe('Service: Foo', () => {
  it('should parse an article from the database',
    () => {
      let article = new Article(fulArticle);
      expect(article.id).toBe(fulArticle.id);
      expect(article.slug).toBe(fulArticle.slug);
      expect(article.title).toBe(fulArticle.title);
      expect(article.subtitle).toBe(fulArticle.subtitle);
      expect(article.description).toBe(fulArticle.description);
      expect(article.created_at).toBe(fulArticle.created_at);
      expect(article.content).toBe(fulArticle.content);
    });
});
