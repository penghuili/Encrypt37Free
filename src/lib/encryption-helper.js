export function getMessageContent(message) {
  const arr = message.split(':');
  return arr.length >= 1 ? arr[1] : arr[0];
}
