import { Router } from '@angular/router';

import { moment } from 'moment';

export interface IArticleOptions {
  id?: string;
  title?: string;
  subtitle?: string;
  description?: string;
  createdAt?: moment;
  content?: string;
  isPublic?: boolean;
  slug?: string;
}

export class Article {
  protected mId: string;
  protected mTitle: string;
  protected mSubtitle: string;
  protected mDescription: string;
  protected mCreatedAt: moment;
  protected mContent: string;
  protected mIsPublic: boolean;
  protected mSlug: string;
  // Extra
  protected url: string = '/';

  constructor(data: IArticleOptions, router: Router) {
    if (data) {
      this.mId = data.id;
      this.mTitle = data.title;
      this.mSubtitle = data.subtitle;
      this.mDescription = data.description;
      this.mCreatedAt = moment(data.createdAt);
      this.mContent = data.content;
      this.mIsPublic = data.isPublic;
      this.mSlug = data.slug;

      this.url = '';

      // this.url = router.generate(['BlogArticle', {
      //   day  : this.mCreatedAt.date() + 1,
      //   month: this.mCreatedAt.month() + 1,
      //   year : this.mCreatedAt.year(),
      //   slug : this.mSlug,
      // }]).toUrlPath();
    }
  }
}
