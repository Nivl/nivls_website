/* tslint:disable:no-unused-variable */

import { By }           from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import {
  beforeEach, beforeEachProviders,
  describe, xdescribe,
  expect, it, xit,
  async, inject
} from '@angular/core/testing';

import { ArticleListComponent } from './article-list.component';

describe('Component: ArticleList', () => {
  it('should create an instance', () => {
    let component = new ArticleListComponent();
    expect(component).toBeTruthy();
  });
});
