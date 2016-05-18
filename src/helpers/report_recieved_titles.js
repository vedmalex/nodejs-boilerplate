import send from './send_promise';
import config from '../config';
import timeFor from './time_for';

export default function reportReceivedTitles(userId, allTitles) {
  if (allTitles.length > 0) {
    if (!PRODUCTION) {
      var end = timeFor('reportReceivedTitles');
    }
    send(config.API.UPDATE_SEEN_TITLES, JSON.stringify([userId, config.SITE_NAME, allTitles.map((t)=> t.text)]));
    if (!PRODUCTION) {
      end();
    }
  }
}
