const isPrime = require('./hw3');

describe('hw3', () => {
  it('should return correct answer when n = 1', () => {
    expect(isPrime(1)).toBe(false);
  });
  it('should return correct answer when n = 2', () => {
    expect(isPrime(2)).toBe(true);
  });
  it('should return correct answer when n = 5', () => {
    expect(isPrime(5)).toBe(true);
  });
  it('should return correct answer when n = 30', () => {
    expect(isPrime(30)).toBe(false);
  });
  it('should return correct answer when n = 99999', () => {
    expect(isPrime(99999)).toBe(false);
  });
  it('should return correct answer when n = 30', () => {
    expect(isPrime(100000)).toBe(false);
  });
});
