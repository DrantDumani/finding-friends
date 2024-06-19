export function convertMs(timestamp) {
  const minutes = Math.floor(timestamp / 60000);
  const seconds = Math.floor((timestamp % 60000) / 1000);
  const ms = Math.floor(timestamp - minutes * 60000 - seconds * 1000);

  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
    2,
    "0"
  )}:${String(Math.ceil(ms / 10) * 10)
    .slice(0, 2)
    .padStart(2, "0")}`;
}
