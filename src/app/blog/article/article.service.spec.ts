/* tslint:disable:no-unused-variable */

import {
  beforeEach, beforeEachProviders,
  describe, xdescribe,
  expect, it, xit,
  async, inject,
  addProviders
} from '@angular/core/testing';

import { ArticleService } from './article.service';

describe('Service: Foo', () => {
  beforeEach(() => {
    addProviders([ArticleService]);
  });

  it('should ...',
    inject([ArticleService],
      (service: ArticleService) => {
        expect(service).toBeTruthy();
      }));
});
