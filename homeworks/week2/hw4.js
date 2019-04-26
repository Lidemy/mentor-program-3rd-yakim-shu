function printFactor(n) {
  for (let i = 1; i <= n; i += 1) {
    if (!(n % i)) console.log(i);
  }
}

printFactor(7);
printFactor(10);
