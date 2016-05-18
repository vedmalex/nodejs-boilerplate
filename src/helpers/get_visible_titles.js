export default function getVisibleTitles(allTitles) {
  let result = [];
  allTitles.forEach((item)=> {
    let obj = $(item);
    if (obj.visible()) {
      result.push(obj);
    }
  });
  return result;
}
