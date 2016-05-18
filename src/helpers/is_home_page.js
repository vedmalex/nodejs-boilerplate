import getURL from './get_url';
import config from '../config';

export default function isHomePage() {
  return new URL(getURL()).pathname.match(config.HOME_PATERN);
}
