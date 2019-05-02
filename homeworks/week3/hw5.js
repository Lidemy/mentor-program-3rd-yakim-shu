function checkNum(str, length, index) {
  let result = 0;
  result = Number(str[length - index]);
  if (!result) result = 0;
  return result;
}
function add(a, b) {
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
  return ans;
}

console.log(add('12312383813881381381', '129018313819319831'));
console.log(add('123', '456'));
module.exports = add;
