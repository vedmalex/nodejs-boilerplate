import config from '../config';
import getURL from './get_url';
import send from './send_promise';

export default function sendReportOnUser(userId) {
  send(config.API.NEW_USER_URL, `user_id=${userId}&URL=${getURL()}`);
}
