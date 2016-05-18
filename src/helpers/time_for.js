let empty = ()=> {};
export default function (point) {
  if (!PRODUCTION) {
    console.time(point);
    return ()=> {
      console.timeEnd(point);
    };
  } else {
    return empty;
  }
}
