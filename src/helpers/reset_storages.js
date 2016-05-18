import collection1 from '../collections/already_viewed_titles';
import collection2 from '../collections/reported_url_num';
import collection3 from '../collections/titles_replacements';
import collection4 from '../collections/url_to_titles_mapping';

export default function resetStorages() {
  collection1.reset();
  collection1.persist();
  collection2.reset();
  collection2.persist();
  collection3.reset();
  collection3.persist();
  collection4.reset();
  collection4.persist();
}
