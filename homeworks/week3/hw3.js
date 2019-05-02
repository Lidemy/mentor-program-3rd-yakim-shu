function isPrime(n) {
  if (n === 1) return false;
  for (let i = 2; i < (n / 2); i += 1) {
    if (!(n % i)) return false;
  }
  return true;
}
module.exports = isPrime;
