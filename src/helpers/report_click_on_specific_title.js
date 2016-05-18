import config from '../config';
import getURL from './get_url';
import getArticleId from './get_article_id';
import isReported from './is_reported_article';
import hasMappingTitleFor from './has_mapping_title_for';
import saveMappingTitleFor from './save_mapping_title_for';
import send from './send_promise';
import setReported from './set_reported_article';
import timeFor from './time_for';

export default function reportClickOnSpecificTitle(userId) {
  if (document.referrer.match(config.VALID_REFERRER)) {
    if (!PRODUCTION) {
      var end = timeFor('reportClickOnSpecificTitle');
    }
    let url = getURL();
    let articleId = getArticleId(url);
    if (isReported(articleId)) {
      return;
    } else {
      let mappingForTitle = hasMappingTitleFor(articleId);
      if (!mappingForTitle) {
        return;
      } else {
        saveMappingTitleFor(articleId, mappingForTitle.title);

        let sendPackage = JSON.stringify([mappingForTitle.title]);
        send(config.API.TITLE_CLICK_INC, sendPackage);
        send(config.API.TITLE_CLICK_REPORT, `user_id=${userId}&URL=${url}&title=${mappingForTitle.title}`);
        setReported(articleId);
      }
    }
    if (!PRODUCTION) {
      end();
    }
  }
}
