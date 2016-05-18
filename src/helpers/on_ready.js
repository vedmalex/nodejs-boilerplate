import bindReady from './bind_ready';

let readyList = [];
export default function (handler) {

  if (!readyList.length) {
    bindReady(function() {
      for (var i = 0, len = readyList.length; i < len; i++) {
        readyList[i]();
      }
    });
  }
  readyList.push(handler);
}
