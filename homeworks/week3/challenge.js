function checkNum(str, length, index) {
  let result = Number(str[length - index]);
  if (!result) result = 0;
  return result;
}
function add(a, b) {
  if (a === 0) return b;
  let temp = 0;
  let temp10 = 0;
  let ans = '';
  const Max = a.length > b.length ? a.length : b.length;
  for (let i = 1; i <= Max; i += 1) {
    const targetA = checkNum(a, a.length, i);
    const targetB = checkNum(b, b.length, i);

    temp = targetA + targetB + temp10;
    if (temp > 9) {
      temp %= 10;
      temp10 = 1;
    } else {
      temp10 = 0;
    }
    ans = temp + ans;
  }
  if (temp10) ans = `1${ans}`;
  return ans;
}

function times(a, b) {
  let ans = 0;
  let temp;
  const Max = a.length > b.length ? a.length : b.length;
  for (let i = 1; i <= Max; i += 1) {
    for (let j = 1; j <= Max; j += 1) {
      temp = 0;
      const targetA = checkNum(a, a.length, i);
      const targetB = checkNum(b, b.length, j);
      temp = targetA * targetB;
      if (j !== 1) temp *= 10 ** (j - 1);
      if (i !== 1) temp *= 10 ** (i - 1);
      ans = add(ans.toString(), temp.toString());
    }
  }
  return ans;
}

module.exports = times;
