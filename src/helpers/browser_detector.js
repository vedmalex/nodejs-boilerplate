
let _browser = {};

function detectBrowser() {
  var uagent = navigator.userAgent.toLowerCase();
  var match = '';
  _browser.chrome  = /webkit/.test(uagent) && /chrome/.test(uagent) && !/edge/.test(uagent);
  _browser.firefox = /mozilla/.test(uagent) && /firefox/.test(uagent);
  _browser.msie    = /msie/.test(uagent) || /trident/.test(uagent) || /edge/.test(uagent);
  _browser.safari  = /safari/.test(uagent) && /applewebkit/.test(uagent) && !/chrome/.test(uagent);
  _browser.opera     = /mozilla/.test(uagent) && /applewebkit/.test(uagent) && /chrome/.test(uagent)  && /safari/.test(uagent) && /opr/.test(uagent);
  _browser.version = '';
  _browser.webkit = /applewebkit/.test(uagent);

  for (let x in _browser) {
    if (_browser[x]) {
      match = uagent.match(new RegExp('(' + (x === 'msie' ? 'msie|edge' : x) + ')( |\/)([0-9]+)'));
      if (match) {
        _browser.version = match[3];
      } else {
        match = uagent.match(new RegExp('rv:([0-9]+)'));
        _browser.version = match ? match[1] : '';
      }
      break;
    }
  }
  _browser.inPrivate = detectPrivateMode(_browser);
  return _browser;
}

function detectPrivateMode(_browser) {
  var isPrivate;

  if (_browser.webkit && _browser.safari) {
    window.webkitRequestFileSystem(
      window.TEMPORARY, 1,
        function() {
          isPrivate = false;
        },
        function(e) {
          isPrivate = true;
        }
      );
  } else if (_browser.firefox) {
    var db;
    try {
      db = window.indexedDB.open('test');
    } catch (e) {
      isPrivate = true;
    }
    if (typeof isPrivate === 'undefined') {
      isPrivate = db.readyState === 'done' ? true : false;
    }
  } else if (_browser.msie) {
    isPrivate = false;
    try {
      if (!window.indexedDB) {
        isPrivate = true;
      }
    } catch (e) {
      isPrivate = true;
    }
  } if (_browser.safari) {
    try {
      window.localStorage.setItem('test', 1);
    } catch (e) {
      isPrivate = true;
    }

    if (typeof isPrivate === 'undefined') {
      isPrivate = false;
      window.localStorage.removeItem('test');
    }
  }
  return isPrivate;
}

detectBrowser();

export default _browser;
