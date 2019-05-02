function join(arr, linkChar) {
  let result = arr[0];
  const LENGTH_ARR = arr.length;
  for (let i = 1; i < LENGTH_ARR; i += 1) {
    result += linkChar + arr[i];
  }
  return result;
}

function repeat(str, times) {
  let result = '';
  for (let i = 0; i < times; i += 1) {
    result += str;
  }
  return result;
}

console.log(join([1, 2, 3], ''));
console.log(join(['a', 'b', 'c'], '!'));
console.log(join(['a', 1, 'b', 2, 'c', 3], ','));
console.log(repeat('a', 5));
console.log(repeat('yoyo', 2));
