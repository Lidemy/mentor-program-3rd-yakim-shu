function stars(n) {
  const result = [];
  for (let i = 1; i <= n; i += 1) {
    let temp = '';
    for (let j = 0; j < i; j += 1) {
      temp += '*';
    }
    result.push(temp);
  }
  return result;
}
module.exports = stars;
