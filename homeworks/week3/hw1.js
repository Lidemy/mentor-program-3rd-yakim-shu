function stars(n) {
  const result = [];
  for (let i = 1; i <= n; i += 1) {
    result.push('*'.repeat(i));
  }
  return result;
}
module.exports = stars;
