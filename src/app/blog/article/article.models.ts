import { Payload } from '../../shared';

export class ArticlePayload extends Payload {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  created_at: string;
  content: string;
};

export class Article extends ArticlePayload {

};
