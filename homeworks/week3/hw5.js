function checkNum(str, length, index) {
  let result = Number(str[length - index]);
  if (!result) result = 0;
  return result;
}
function findMax(a, b) {
  return a.length > b.length ? a.length : b.length;
}
function add(a, b) {
  let temp = 0;
  let temp10 = 0;
  let ans = '';
  const Max = findMax(a, b);
  for (let i = 1; i <= Max; i += 1) {
    temp = checkNum(a, a.length, i) + checkNum(b, b.length, i) + temp10;
    temp10 = temp > 9 ? 1 : 0;
    temp %= 10;
    ans = temp + ans;
  }
  if (temp10) ans = `1${ans}`;
  return ans;
}
module.exports = add;
