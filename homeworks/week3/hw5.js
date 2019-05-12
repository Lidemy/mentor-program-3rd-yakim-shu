function add(a, b) {
  let temp10 = 0;
  let ans = '';
  const Max = a.length > b.length ? a.length : b.length;
  for (let i = 1; i <= Max; i += 1) {
    // 從後往前取數字，空位補 0
    let temp = (Number(a[a.length - i]) || 0) + (Number(b[b.length - i]) || 0) + temp10;
    temp10 = temp > 9 ? 1 : 0;
    temp %= 10;
    ans = temp + ans;
  }
  if (temp10) ans = `1${ans}`; // 最後還要再進一位，前面補 1
  return ans;
}
module.exports = add;
