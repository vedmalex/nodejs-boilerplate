import config from '../config';

export default function getArticleId(url) {
  let result = url.match(config.ARTICLE_ID_PATTERN);
  return (result && result[1]) || undefined;
}
