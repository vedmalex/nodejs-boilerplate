import config from '../config';

export default function setCookie(value) {
  let cookieName = config.COOKIE_NAME;
  let expires = 'expires=Thu, 7 Aug 2025 20:00:00 UTC';
  let path = 'path=/';
  let cookie = cookieName + '=' + value + '; ' + expires + '; ' + path;
  try {
    document.cookie = cookie;
  }
  catch (ex) {
    if (!PRODUCTION) {
      console.log(ex);
    }
  }
}
