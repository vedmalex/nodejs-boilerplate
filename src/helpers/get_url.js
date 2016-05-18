export default function getURL() {
  if (window.location) {
    return window.location.href;
  } else {
    return document.URL;
  }
}
