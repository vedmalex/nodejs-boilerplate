import Promise from '../lib/promise';

export default function (url, content) {
  return new Promise((resolve, reject) => {
    let request = new XMLHttpRequest();
    request.open('POST', url , true);
    request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
    request.onload = function() {
      resolve(request.responseText);
    };

    request.onerror = function() {
      reject(new Error('timout'));
    };
    request.send(content);
  });
}
