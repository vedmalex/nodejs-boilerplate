import collection from '../collections/replacement_titles';

export default function(title, replacement) {
  collection.load();
  let apt = collection.findById(replacement);
  if (!apt) {
    collection.create({replacement: replacement,  title: title});
  } else {
    collection.update({replacement: replacement}, {title: title});
  }
  collection.persist();
}
