import delay from './delay';
import Promise from './promise';

export default function (promise, time) {
  return new Promise((fulfill, reject)=> {
    // race promise against delay
    promise.then(fulfill, reject);
    delay(time).done(function() {
      reject(new Error('Operation timed out'));
    });
  });
}
