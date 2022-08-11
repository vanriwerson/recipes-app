export default function limitArrayLength(array, length) {
  return array?.filter((_item, index) => index < length);
}
