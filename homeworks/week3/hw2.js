function alphaSwap(str) {
  let result = '';
  for (let i = 0; i < str.length; i += 1) {
    result += str[i] >= 'a' && str[i] <= 'z' ? str[i].toUpperCase() : str[i].toLowerCase();
  }
  return result;
}
module.exports = alphaSwap;
