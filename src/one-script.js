import getTitles from './helpers/get_titles';
import showRegions from './helpers/show_regions';
import timeFor from './helpers/time_for';
import cTitleReplacement from './collections/titles_replacements';
import ensureCookie from './helpers/ensure_cookie';
import setReverseTitle from './helpers/set_reverse_title';
import config from './config';

if (!PRODUCTION) {
  var run = 0;
}
export default function (...selectors) {
  textLab.getJson.waitForData.then(()=> {
    if (!PRODUCTION) {
      var current = run++;
      var end = timeFor(`process headers start for ${current}`);
    }
    let titles = config.getTitles(...selectors);
    let allTitles = getTitles(titles);
    if (allTitles.length > 0) {
      processHeaders(allTitles);
      showRegions(...selectors);
      if (!PRODUCTION) {
        end();
      }
    } else {
      showRegions(...selectors);
      if (!PRODUCTION) {
        end();
      }
    }
  }, ()=> {
    showRegions(...selectors);
  });
}

function processHeaders(allTitles) {
  cTitleReplacement.load();
  for (let i = 1, len = allTitles.length; i < len; i++) {
    let a = allTitles[i];
    let text = a.text.trim();
    if (text) {
      let stored = cTitleReplacement.findById(text);
      if (stored) {
        let sText = stored ? stored.replacement : text;
        if (sText && (sText = sText.trim())) {
          if (sText !== text) {
            a.text = sText;
            setReverseTitle(text, sText);
          }
        }
      }
    }
  }
}
