import './load-headers';
import './jquery-ext';
import config from './config';
import ensureCookie from './helpers/ensure_cookie';
import getCookie from './helpers/get_cookie';
import isSupportedBrowser from './helpers/is_supported_browser';
import resetStorages from './helpers/reset_storages';
import setupReporting from './setup-reporting';
import onReady from './helpers/on_ready';

import getTitles from './helpers/get_titles';
import showRegions from './helpers/show_regions';
import timeFor from './helpers/time_for';
import oneScript from './one-script';

export {getTitles};
export {showRegions};
export {timeFor};
export {oneScript};

if (!PRODUCTION) {
  var end = timeFor('waiting for DOM-ready');
}
let userId = getCookie(config.COOKIE_NAME);

function runReplacements() {
  textLab.getJson.waitForData.then(()=> {
    if (!PRODUCTION) {
      end();
    }
    if (!PRODUCTION) {
      var endRun = timeFor('bottom titles replacement');
    }
    oneScript('*');
    if (!PRODUCTION) {
      endRun();
    }
    setImmediate(setupReporting);
  }, ()=> {
    showRegions('*');
  });
}

if (userId) {
  if (isSupportedBrowser) {
    onReady(runReplacements);
  } else {
    onReady(function() {
      showRegions('*');
      if (!PRODUCTION) {
        console.log('unsupported');
      }
    });
  }
} else {
  ensureCookie();
  resetStorages();
  onReady(function() {
    showRegions('*');
    if (!PRODUCTION) {
      console.log('unsupported');
    }
  });
}

// пересобрать код... сделать так чтобы он работал и включался, но уже с промисами.
