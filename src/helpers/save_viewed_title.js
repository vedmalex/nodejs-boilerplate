import collection from '../collections/already_viewed_titles';

export default function saveViewedTitle(title) {
  collection.load();
  let va = collection.findById(title);
  if (!va) {
    collection.create({ title: title, date: Date.now()});
    collection.persist();
  }
}
