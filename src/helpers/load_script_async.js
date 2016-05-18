export default function(src) {
  var js = document.createElement('script');
  js.src = src;
  var head = document.getElementsByTagName('head')[0];
  head.appendChild(js);
}
