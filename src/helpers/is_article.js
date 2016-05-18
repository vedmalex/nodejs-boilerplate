import getUrl from './get_url';
import config from '../config';

export default function isArticle() {
  return new URL(getURL()).pathname.match(config.ARTICLE_PATTERN);
}
