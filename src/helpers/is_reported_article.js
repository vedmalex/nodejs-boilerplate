import collection from '../collections/reported_url_num';

export default function isReported(articleId) {
  collection.load();
  return !!collection.findById(articleId);
}
