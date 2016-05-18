import collection from '../collections/url_to_titles_mapping';

export default function saveMappingTitleFor(articleId, title) {
  collection.load();
  let va = collection.findById(articleId);
  if (!va) {
    collection.create({ url: articleId, title: title, date: Date.now()});
    collection.persist();
  }
}
