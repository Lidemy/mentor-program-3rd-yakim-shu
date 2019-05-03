function checkNum(str, length, index) {
  let result = Number(str[length - index]);
  if (!result) result = 0;
  return result;
}
function add(a, b) {
  let temp = 0;
  let temp10 = 0;
  let ans = '';
  const Max = a.length > b.length ? a.length : b.length;
  for (let i = 1; i <= Max; i += 1) {
    temp = checkNum(a, a.length, i) + checkNum(b, b.length, i) + temp10;
    temp10 = temp > 9 ? 1 : 0;
    temp %= 10;
    ans = temp + ans;
  }
  if (temp10) ans = `1${ans}`;
  return ans;
}

function times(a, b) {
  let ans = '';
  let temp = 0;
  for (let i = 1; i <= a.length; i += 1) {
    for (let j = 1; j <= b.length; j += 1) {
      temp = checkNum(a, a.length, i) * checkNum(b, b.length, j) + '0'.repeat(i + j - 2);
      ans = add(ans.toString(), temp);
    }
  }
  return ans;
}
module.exports = times;
