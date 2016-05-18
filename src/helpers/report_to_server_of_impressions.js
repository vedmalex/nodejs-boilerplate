import getAllTitles from './get_all_titles';
import config from '../config';
import getVisibleTitles from './get_visible_titles';
import isViewedTitle from './is_viewed_title';
import saveViewedTitle from './save_viewed_title';
import getOriginalTitle from './get_original_title';

import send from './send_promise';
import timeFor from './time_for';

export default function reportToServerOfImpressions(userId, allTitles) {
  if (!PRODUCTION) {
    var end = timeFor('reportToServerOfImpressions');
  }

  let titles = getVisibleTitles(allTitles);
  if (titles && titles.length > 0) {
    let titlesToReportToServer = [];
    let listOfTitles = [];
    for (let i = 0, len = titles.length; i < len; i++) {
      let titleText = titles[i] && titles[i].text();
      if (titleText && (titleText = titleText.trim())) {
        let oTitle = getOriginalTitle(titleText);
        if (!isViewedTitle(titleText) && !isViewedTitle(oTitle)) {
          titlesToReportToServer.push([titleText]);//<< removed userType
          listOfTitles.push(titleText);
          saveViewedTitle(titleText);
          saveViewedTitle(oTitle);
        }
      }
    }

    if (titlesToReportToServer.length > 0) {
      send(config.API.IMPRESSION_REPORT, JSON.stringify(titlesToReportToServer));
    }

    if (listOfTitles.length > 0) {
      send(config.API.TITLE_CLICK_REPORT, JSON.stringify(listOfTitles));
    }
    if (!PRODUCTION) {
      end();
    }
  }
}
