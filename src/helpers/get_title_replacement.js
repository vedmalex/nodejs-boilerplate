import collection from '../collection/titles_replacements';

export default function getTitleReplacement(title) {
  collection.load();
  return collection.findById(title);
}
