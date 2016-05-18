import Promise from './promise';

export default function (time) {
  return new Promise((fulfill)=> {
    setTimeout(fulfill, time);
  });
}
