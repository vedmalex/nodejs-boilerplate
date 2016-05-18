import config from '../config';

export default function getCookie() {
  let cookieName = config.COOKIE_NAME;
  let cookies = document.cookie.split(';');
  for (let i = 0, len = cookies.length; i < len; i++) {
    let names = cookies[i].split('=');
    if (names[0].trim() == cookieName.trim()) {
      return names[1];
    }
  }
  return '';
}
