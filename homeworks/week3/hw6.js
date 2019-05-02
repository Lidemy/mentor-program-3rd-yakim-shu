function checkNum(str, length, index) {
  let result = 0;
  result = Number(str[length - index]);
  if (!result) result = 0;
  return result;
}
function add(a, b) {
  if (a === 0) return b;
  let temp = 0;
  let temp10 = 0;
  let ans = '';
  const Max = a.length > b.length ? a.length : b.length;
  for (let i = 1; i <= Max + 1; i += 1) {
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
  ans = ans[0].replace('0', '') + ans.substr(1);
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

// console.log(add('12312383813881381381', '129018313819319831'));
// console.log(add('9882342346', '245678567832'));
// console.log(add('123', '456'));
// console.log(times('1352396', '78'));
console.log(times('273487034', '274358') === '75033355674172');
// console.log(times('11', '22'));
module.exports = add;
