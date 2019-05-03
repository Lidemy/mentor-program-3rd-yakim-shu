function checkNum(str, index) {
  return Number(str[str.length - index]) || 0; // 從後往前取數字，空位補 0
}
function add(a, b) {
  let temp = 0;
  let temp10 = 0;
  let ans = '';
  const Max = a.length > b.length ? a.length : b.length;
  for (let i = 1; i <= Max; i += 1) {
    temp = checkNum(a, i) + checkNum(b, i) + temp10;
    temp10 = temp > 9 ? 1 : 0;
    temp %= 10;
    ans = temp + ans;
  }
  if (temp10) ans = `1${ans}`; // 最後還要再進一位，前面補 1
  return ans;
}

function times(a, b) {
  let ans = '';
  let temp = 0;
  for (let i = 1; i <= a.length; i += 1) {
    for (let j = 1; j <= b.length; j += 1) {
      temp = checkNum(a, i) * checkNum(b, j) + '0'.repeat(i + j - 2); // 乘積後面補上 n 位數的 0
      ans = add(ans, temp); // 乘積不斷相加
    }
  }
  return ans;
}
module.exports = times;
