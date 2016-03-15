import moment from 'moment';

export default class Article {
  id;
  title;
  subtitle;
  description;
  createdAt;
  content;
  isPublic;
  slug;
  // Extra
  url = '/';

  constructor(data, router) {
    this.id = data.id;
    this.title = data.title;
    this.subtitle = data.subtitle;
    this.description = data.description;
    this.createdAt = moment(data.createdAt);
    this.content = data.content;
    this.isPublic = data.isPublic;
    this.slug = data.slug;

    this.url = router.generate(['BlogReadArticle', {
      day  : this.createdAt.day(),
      month: this.createdAt.month(),
      year : this.createdAt.year(),
      slug : this.slug,
    }]).toUrlPath();
  }

  /**
   * Save an article
   * @param  ArticleManager manager Imstance of an ArticleManager
   * @return Promise
   */
  save(manager) {
    return new Promise((resolve, reject) => {
      reject();
    });
  }
}
