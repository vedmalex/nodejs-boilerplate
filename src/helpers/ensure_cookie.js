import config from '../config';
import getCookie from './get_cookie';
import setCookie from './set_cookie';
import sendReportOnUser from './send_report_on_user';

export default function ensureCookie() {
  let userId = getCookie();
  if (!userId) {
    userId = Math.floor(Math.random() * Math.pow(10, 18));
    sendReportOnUser(userId);
    setCookie(userId);
  }
  return userId;
}
