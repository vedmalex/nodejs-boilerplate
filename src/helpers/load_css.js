import config from '../config';

export default function(src) {
  var css = document.createElement('style');
  css.type = 'text/css';
  css.innerHTML =  `${Object.keys(config.titlesHash).join(',')} { opacity: 0; }`;
  var head = document.getElementsByTagName('head')[0];
  head.appendChild(css);
}
