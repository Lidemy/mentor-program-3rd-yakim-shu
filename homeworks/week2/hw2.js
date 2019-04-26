function capitalize(str) {
  // 丟入調整過的首位字母
  const INDEX = 0;
  let result = str[INDEX];
  if (result >= 'a' && result <= 'z') {
    result = result.toUpperCase();
  }
  // 丟入剩餘的字母
  for (let i = 1; i < str.length; i += 1) {
    result += str[i];
  }
  return result;
}

console.log(capitalize('nick'));
console.log(capitalize('Nick'));
console.log(capitalize(',hello'));
