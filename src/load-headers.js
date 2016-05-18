import getCookie from './helpers/get_cookie';
import isSupportedBrowser from './helpers/is_supported_browser';
import timeFor from './helpers/time_for';
import saveAllTitles from './helpers/save_all_titles';
if (!PRODUCTION) {
  var end = timeFor('loadHeaders Script actually');
}
let userId = getCookie();

if (userId && isSupportedBrowser) {
  textLab.getJson.waitForData.then((titles)=> {
    if (Object.keys(titles).length > 0) {
      saveAllTitles(titles);
      if (!PRODUCTION) {
        end();
      }
    }
  });
}
