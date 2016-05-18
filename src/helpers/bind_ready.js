export default function (handler) {

  var called = false;

  function ready() {
    if (!called) {
      called = true;
      handler();
    }
  }

  if (document.addEventListener) {
    document.addEventListener('DOMContentLoaded', function() {
      ready();
    }, false);
  } else if (document.attachEvent) {

    if (document.documentElement.doScroll && window == window.top) {
      function tryScroll() {
        if (!called) {
          if (document.body) {
            try {
              document.documentElement.doScroll('left');
              ready();
            } catch (e) {
              setTimeout(tryScroll, 0);
            }
          }
        }
      }
      tryScroll();
    }

    document.attachEvent('onreadystatechange', function() {

      if (document.readyState === 'complete') {
        ready();
      }
    });
  }

  if (window.addEventListener) {
    window.addEventListener('load', ready, false);
  } else if (window.attachEvent) {
    window.attachEvent('onload', ready);
  }
}
