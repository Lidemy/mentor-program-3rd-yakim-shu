function reverse(str) {
  let result = '';
  let i = str.length - 1; // 最後一個[序數]為[長度-1]
  while (i >= 0) {
    result += str[i];
    i -= 1;
  }
  console.log(result);
}

reverse('yoyoyo');
reverse('1abc2');
reverse('1,2,3,2,1');
