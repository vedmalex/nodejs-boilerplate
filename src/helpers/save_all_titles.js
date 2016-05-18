import collection from '../collections/titles_replacements';

export default function saveAllTitles(titles) {
  // clear All Titles once we have new reponse.
  collection.reset();
  collection.persist();
  collection.load();
  for (let title in titles) {
    let tdescr = collection.findById(title);
    if (!tdescr) {
      collection.create({ title: title, replacement: titles[title], date: Date.now()});
    } else {
      collection.update({ title: title}, {replacement: titles[title], date: Date.now()});
    }
  }
  collection.persist();
}
