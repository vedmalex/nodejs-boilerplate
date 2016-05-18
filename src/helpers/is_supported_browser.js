import browser from './browser_detector';

function checkBrowserApi() {

  function lsTest() {
    let test = 'test';
    try {
      localStorage.setItem(test, test);
      localStorage.removeItem(test);
      return true;
    } catch (e) {
      return false;
    }
  }

  function loggingTest() {
    try {
      return !!(window.console && window.console.log);
    } catch (e) {
      return false;
    }
  }

  function checkApi() {
    try {
      let result =
      (typeof document.addEventListener == 'function' || typeof document.attachEvent == 'function') &&
      (typeof document.removeEventListener == 'function' || typeof document.detachEvent == 'function') &&
      (typeof document.querySelector == 'function') &&
      (typeof document.getElementsByTagName == 'function') &&
      (JSON && (typeof JSON.parse === 'function') && (typeof JSON.stringify === 'function'));
      return result;
    } catch (e) {
      return false;
    }
  }

  return checkApi() && lsTest() && loggingTest() && !browser.inPrivate;
}

export default checkBrowserApi();
