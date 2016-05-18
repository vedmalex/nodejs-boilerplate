import collection from '../collections/reported_url_num';

export default function setReported(articleId) {
  collection.load();
  let va = collection.findById(articleId);
  if (!va) {
    collection.create({ url: articleId, date: Date.now()});
    collection.persist();
  }
}
