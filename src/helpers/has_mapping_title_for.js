import atm from '../collections/url_to_titles_mapping';

export default function hasMappingTitleFor(articleId) {
  atm.load();
  return atm.findById(articleId);
}
