export default function converter(date) {
  let a = new Date(date);
  let b = a.toUTCString();
  return b;
}
