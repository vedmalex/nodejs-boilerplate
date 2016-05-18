export default function isLessThanWeekAgo(time) {
  let fullHoursPassed = Math.floor((Date.now() - a) / (60 * 60 * 1000)); // ms -> sec -> hour
  return fullHoursPassed < (24 * 7);
}
