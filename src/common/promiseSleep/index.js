export default function sleep(msec = 1000) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(null);
    }, msec);
  });
}
