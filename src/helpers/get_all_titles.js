export default function getAllTitles(selector) {
  let result = [];
  selector.LINK.forEach(link=> {
    let res = $(link.selector).toArray();
    link.filters.forEach(filter => result.push(...res.filter(filter)));
  });
  return result;
}
