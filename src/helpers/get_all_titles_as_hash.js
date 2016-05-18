export default function getAllTitlesAsHash(allTitles) {
  return allTitles.reduce((prev, curr)=> {
    prev[curr.text] = curr.text;
    return prev;
  },{});
}
