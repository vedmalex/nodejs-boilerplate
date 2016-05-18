import config from '../config';
import Promise from '../lib/promise';
import timeout from '../lib/timeout';
import reportTimeout from './report_timeout';

// it always return the data current or previous, in any case
export default function (getJson) {
  return timeout(getJson, config.TIMEOUT)
  .then(
    (data)=> new Promise((res, rej)=> {
      let [,,titles]  = JSON.parse(data);
      localStorage.setItem(config.COOKIE_NAME, JSON.stringify(titles));
      res(titles);
    }),
    ()=> new Promise((res)=> {
      reportTimeout();
      let data = localStorage.getItem(config.COOKIE_NAME);
      data = data ? JSON.parse(data) : {}; // null?
      res(data);
    })
  );
}
