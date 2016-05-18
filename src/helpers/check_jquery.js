export default function () {
  try {
    return !!window.jQuery;
  }
  catch (e) {
    return false;
  }
}
