function isPalindromes(str) {
  let result = str;
  while (result.length > 1) {
    if (!(result[0] === result[result.length - 1])) return false;
    result = result.substr(1, result.length - 2);
  }
  return true;
}
module.exports = isPalindromes;
