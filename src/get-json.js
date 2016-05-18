import config from './config';
import getCookie from './helpers/get_cookie';
import isSupportedBrowser from './helpers/is_supported_browser';
import loadScript from './helpers/load_script_async';
import loadCss from './helpers/load_css';
import showRegions from './helpers/show_regions';
import send from './helpers/send_promise';
import processJson from './helpers/process_json';
import timeFor from './helpers/time_for';

export {config};
export {timeFor};
export function oneScript(...selectors) {
  if (textLab.headingsReplacer) {
    textLab.headingsReplacer.oneScript(...selectors);
  } else {
    // apply visibility to element
    showRegions(...selectors);
  }
}

function run() {
  if (!PRODUCTION) {
    var end = timeFor('getjson');
  }
  let userId = getCookie();
  var result;
  if (userId && isSupportedBrowser) {
    let content = JSON.stringify([
          userId,
          'globes'
      ]);
    result = processJson(send(config.API.GET_JSON_POST, content));
    loadScript(config.HEADER_REPLACER);
    loadCss();
  } else {
    result = new Promise((res, rej)=> {
      rej(new Error('not supported browser'));
    });
  }
  if (!PRODUCTION) {
    result.done(()=> {
      end();
    });
  }
  return result;
}

export const waitForData = run();
