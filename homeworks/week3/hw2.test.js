const alphaSwap = require('./hw2');

describe('hw2', () => {
  it('should return correct answer when str = nick', () => {
    expect(alphaSwap('nick')).toBe('NICK');
  });
  it('should return correct answer when str = ,hEllO122', () => {
    expect(alphaSwap(',hEllO122')).toBe(',HeLLo122');
  });
  it('should return correct answer when str = hfEDMd0!,d', () => {
    expect(alphaSwap('hfEDMd0!,d')).toBe('HFedmD0!,D');
  });
});
