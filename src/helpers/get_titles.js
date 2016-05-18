export default function getTitles(blocks) {
  let result = [];
  blocks.forEach((block)=> block.regions.forEach((region)=> {
    let res = $(`${region} ${block.selector}`).toArray();
    block.filters.forEach(filter => result.push(...res.filter(filter)));
  }));
  return result;
}
