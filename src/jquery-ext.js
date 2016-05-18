import isSupportedBrowser from './helpers/is_supported_browser';
import getCookie from './helpers/get_cookie';
import isHomePage from './helpers/is_home_page';
import config from './config';
import onReady from './helpers/on_ready';
import checkJQuery from './helpers/check_jquery';

let hasCookie = getCookie(config.COOKIE_NAME);
if (!(!isHomePage() && !hasCookie)) {
  if (isSupportedBrowser) {
    onReady(function() {
      if (checkJQuery()) {
        // http://stackoverflow.com/questions/3701311/event-when-user-stops-scrolling
        $.fn.scrollEnd = function(callback, timeout) {
          $(this).scroll(function() {
            let $this = $(this);
            if ($this.data('scrollTimeout')) {
              clearTimeout($this.data('scrollTimeout'));
            }
            $this.data('scrollTimeout', setTimeout(callback, timeout));
          });
        };

        var $w = $(window);
        $.fn.visible = function(partial, hidden, direction) {

          if (this.length < 1) {
            return;
          }

          var $t        = this.length > 1 ? this.eq(0) : this;
          var t         = $t.get(0);
          var vpWidth   = $w.width();
          var vpHeight  = $w.height();
          var direction = (direction) ? direction : 'both';
          var clientSize = hidden === true ? t.offsetWidth * t.offsetHeight : true;

          if (typeof t.getBoundingClientRect === 'function') {

            // Use this native browser method, if available.
            var rec = t.getBoundingClientRect();
            var tViz = rec.top    >= 0 && rec.top    <  vpHeight;
            var bViz = rec.bottom >  0 && rec.bottom <= vpHeight;
            var lViz = rec.left   >= 0 && rec.left   <  vpWidth;
            var rViz = rec.right  >  0 && rec.right  <= vpWidth;
            var vVisible   = partial ? tViz || bViz : tViz && bViz;
            var hVisible   = partial ? lViz || rViz : lViz && rViz;

            if (direction === 'both') {
              return clientSize && vVisible && hVisible;
            } else if (direction === 'vertical') {
              return clientSize && vVisible;
            } else if (direction === 'horizontal') {
              return clientSize && hVisible;
            }
          } else {

            var    viewTop         = $w.scrollTop();
            var    viewBottom      = viewTop + vpHeight;
            var    viewLeft        = $w.scrollLeft();
            var    viewRight       = viewLeft + vpWidth;
            var    offset          = $t.offset();
            var    _top            = offset.top;
            var    _bottom         = _top + $t.height();
            var    _left           = offset.left;
            var    _right          = _left + $t.width();
            var    compareTop      = partial === true ? _bottom : _top;
            var    compareBottom   = partial === true ? _top : _bottom;
            var    compareLeft     = partial === true ? _right : _left;
            var    compareRight    = partial === true ? _left : _right;

            if (direction === 'both') {
              return !!clientSize && ((compareBottom <= viewBottom) && (compareTop >= viewTop)) && ((compareRight <= viewRight) && (compareLeft >= viewLeft));
            } else if (direction === 'vertical') {
              return !!clientSize && ((compareBottom <= viewBottom) && (compareTop >= viewTop));
            } else if (direction === 'horizontal') {
              return !!clientSize && ((compareRight <= viewRight) && (compareLeft >= viewLeft));
            }
          }
        };
      }
    });
  }
}
