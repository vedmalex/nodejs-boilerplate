import collection from '../collections/replacement_titles';

export default function(replacement) {
  collection.load();
  let apt = collection.findById(replacement);
  if (apt) {
    return apt.title;
  } else {
    return replacement;
  }
}
