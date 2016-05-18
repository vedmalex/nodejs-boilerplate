export default function debugTimeline(point) {
  if (!PRODUCTION) {
    console.timeStamp(point);
  }
}
