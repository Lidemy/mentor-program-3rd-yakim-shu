function printStars(n) {
  if (!(typeof n === 'number') || n % 1 || n < 1 || n > 30) {
    console.log('值為:', n, ', 請輸入大於 0 且小於 31 的正整數');
    return -1;
  }
  for (let i = 0; i < n; i += 1) {
    console.log('*');
  }
  return 0;
}

printStars(6);
printStars(-2);
printStars('ddd');
printStars(999);
