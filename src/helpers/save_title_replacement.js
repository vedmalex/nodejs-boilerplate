import collection from '../collections/titles_replacements';

export default function saveTitleReplacement(title, replacement) {
  collection.load();
  let tdescr = collection.findById(title);
  if (!tdescr) {
    collection.create({ title: title, replacement: replacement, date: Date.now()});
    collection.persist();
  }
}
