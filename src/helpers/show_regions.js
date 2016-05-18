import config from '../config';
import timeFor from './time_for';

export default function showRegions(...selectors) {
  if (!PRODUCTION) {
    var end = timeFor(`show Reqion for selector(s): ${selectors.join(',')}`);
  }
  if (selectors[0] == '*') {
    selectors.length = 0;
    selectors = selectors.concat(Object.keys(config.titlesHash).filter((s)=>!config.shown[s]));
  }

  for (let i = 0, sLen = selectors.length; i < sLen; i++) {
    const elList = document.querySelectorAll(selectors[i]);
    for (var j = 0, len = elList.length; j < len; j++) {
      elList[j].style.opacity = 1;
    }
  }
  if (!PRODUCTION) {
    end();
  }
}

