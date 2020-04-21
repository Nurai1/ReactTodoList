export function makeIndexCounter() {
  let index=0;
  return function() {
    return index++;
  }
}
