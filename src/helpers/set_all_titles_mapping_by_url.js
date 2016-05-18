import saveMappingTitleFor from './save_mapping_title_for';
import getArticleId from './get_article_id';
import timeFor from './time_for';

export default function setAllTitlesMappingByUrl(allTitles) {
  if (!PRODUCTION) {
    var end = timeFor('setAllTitlesMappingByUrl');
  }
  for (let i = 0, len = allTitles.length; i < len; i++) {
    let url = $(allTitles[i]).attr('href');
    let articleId = getArticleId(url);
    if (articleId > 0) {
      saveMappingTitleFor(articleId, allTitles[i].text);
    }
  }
  if (!PRODUCTION) {
    end();
  }
}
