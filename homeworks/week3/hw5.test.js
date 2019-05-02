const add = require('./hw5');

describe('hw5', () => {
  it('should return correct answer when a=111111111111111111111111111111111111 and b=111111111111111111111111111111111111', () => {
    expect(add('111111111111111111111111111111111111', '111111111111111111111111111111111111')).toBe('222222222222222222222222222222222222');
  });
  it('should return correct answer when a=374589743234945 and b=82904589275', () => {
    expect(add('374589743234945', '82904589275')).toBe('374672647824220');
  });
  it('should return correct answer when a=12312383813881381381 and b=129018313819319831', () => {
    expect(add('12312383813881381381', '129018313819319831')).toBe('12441402127700701212');
  });
  it('should return correct answer when a=9882342346 and b=245678567832', () => {
    expect(add('9882342346', '2456785678')).toBe('12339128024');
  });
  it('should return correct answer when a=999999999999999 and b=1', () => {
    expect(add('999999999999999', '1')).toBe('1000000000000000');
  });
  it('should return correct answer when a=99999999999 and b=99999999999999', () => {
    expect(add('99999999999', '99999999999999')).toBe('100099999999998');
  });
});
