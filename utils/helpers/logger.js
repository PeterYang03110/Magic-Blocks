export default function logger(label, param) {
  if (process.env.NETWORK === 'mainnet') {
    return;
  }
  console.log(label, param);
}
