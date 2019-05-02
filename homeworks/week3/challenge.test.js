const times = require('./challenge');

describe('challenge', () => {
  it('should return correct answer when a=11 and b=22', () => {
    expect(times('11', '22')).toBe('242');
  });
  it('should return correct answer when a=273487034 and b=274358', () => {
    expect(times('273487034', '274358')).toBe('75033355674172');
  });
  it('should return correct answer when a=99999999 and b=9999999', () => {
    expect(times('99999999', '9999999')).toBe('999999890000001');
  });
});
