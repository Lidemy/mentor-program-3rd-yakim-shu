const stars = require('./hw1');

describe('hw1', () => {
  it('should return correct answer when n = 1', () => {
    expect(stars(1)).toEqual(['*']);
  });
  it('should return correct answer when n = 6', () => {
    expect(stars(6)).toEqual(['*', '**', '***', '****', '*****', '******']);
  });
});
