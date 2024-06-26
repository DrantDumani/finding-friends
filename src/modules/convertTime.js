export function convertMs(timestamp, includeMs = false) {
  const minutes = Math.floor(timestamp / 60000);
  const seconds = Math.floor((timestamp % 60000) / 1000);
  const ms = Math.floor(timestamp - minutes * 60000 - seconds * 1000);

  const timeStr = `${String(minutes).padStart(2, "0")}:${String(
    seconds
  ).padStart(2, "0")}:${String(ms).slice(0, 2).padStart(2, "0")}`;

  return includeMs ? timeStr : timeStr.slice(0, 5);
}

export function convertDate(dateStr) {
  const dateObj = new Date(dateStr);
  const strArr = dateObj.toLocaleDateString("en-US").split("/");

  strArr[2] = strArr[2].slice(2);
  return strArr.join("/");
}
