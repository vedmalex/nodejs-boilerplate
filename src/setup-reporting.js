import getTitles from './helpers/get_titles';
import reportClickOnSpecificTitle from './helpers/report_click_on_specific_title';
import reportToServerOfImpressions from './helpers/report_to_server_of_impressions';
// import reportReceivedTitles from './helpers/report_recieved_titles';
import setAllTitlesMappingByUrl from './helpers/set_all_titles_mapping_by_url';
import isHomePage from './helpers/is_home_page';
import config from './config';

export default function() {
  let userId = getCookie(config.COOKIE_NAME);
  let allTitles = getTitles(config.TITLES);
  if (!isHomePage()) {
    setImmediate(()=> reportClickOnSpecificTitle(userId));
  } else {
    setImmediate(()=> reportToServerOfImpressions(userId, allTitles));
    setImmediate(()=> setAllTitlesMappingByUrl(allTitles));
    //
    // not need in current flow
    // setImmediate(()=> reportReceivedTitles(userId, allTitles));
    $(window).scrollEnd(()=> reportToServerOfImpressions(userId, allTitles), 1000);
  }
}
