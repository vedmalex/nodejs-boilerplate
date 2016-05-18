import config from '../config';
import getCookie from './get_cookie';
import getURL from './get_url';
import send from './send_promise';

export default function () {
  send(config.API.TIMEOUT_REPORT_URL, `user_id=${getCookie()}&URL=${getURL()}`);
}
