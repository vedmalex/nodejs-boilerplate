import collection from '../collections/already_viewed_titles';

export default function isViewedTitle(title) {
  collection.load();
  return collection.findById(title);
}
