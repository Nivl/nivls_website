export default class Article {
  id;
  title;
  subtitle;
  description;
  createdAt;
  content;
  isPublic;

  constructor(data) {
    this.id = data.id;
    this.title = data.title;
    this.subtitle = data.subtitle;
    this.description = data.description;
    this.createdAt = data.createdAt;
    this.content = data.content;
    this.isPublic = data.isPublic;
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
