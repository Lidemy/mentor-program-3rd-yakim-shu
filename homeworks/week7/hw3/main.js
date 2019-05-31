const inputResultTop = document.querySelector('.row__result span');
const inputResult = document.querySelector('.row__result strong');
const calculator = document.querySelector('.calculator');
const calcAll = ['+', '-', '*', '/'];
const numFixed = 5; // 小數點後 5 位直接刪掉
let numOrigin = '';
let numResult = '';
let calcSign = '';
let isCalculated = false;
let isFinish = false;

function showError() {
  calculator.classList.add('animated', 'shake', 'fast');
}

// 計算 function
function calculatoring(sign, first, sec) {
  switch (sign) {
    case '+':
      // console.log()
      return first + sec;
    case '-':
      return first - sec;
    case '*':
      return first * sec;
    case '/':
      if (sec === '0') {
        showError();
        return ['任何數除以 0 => 無意義', '🧞‍'];
      }
      return first / sec;
    default:
      break;
  }
  return false;
}

// click - 歸零 (AC)
function clickReset() {
  isCalculated = false;
  isFinish = false;
  numOrigin = '';
  numResult = '';
  return ['0', '0'];
}
// click - 加、減、乘、除 (+、-、*、/)
function clickCalc(sign) {
  isCalculated = true;
  calcSign = sign;
  if (numResult) return [numResult + sign, sign];
  return [numOrigin, sign];
}
// click - 等於 (=)
function clickResult() {
  isCalculated = false;
  isFinish = true;
  const arr = numOrigin.split(calcSign);
  const numFir = Number(arr[0]);
  const numSec = Number(arr[1].substring(0, arr[1].length - 1));
  numResult = calculatoring(calcSign, numFir, numSec);
  return [numOrigin, numResult];
}

// 已有運算符號的處理，只顯示後來的數字
function showMainNum(value) {
  if (numResult) {
    numOrigin = numResult + calcSign + value;
    numResult = '';
    isCalculated = true;
  }
  const index = numOrigin.indexOf(calcSign);
  return [numOrigin, numOrigin.substr(index + 1)];
}

// 刪除多位數 float
function isFloat(mainValue) {
  const num = mainValue.toString();
  if (num.split('.')[1].length < numFixed) return mainValue;
  return Number(num).toFixed(numFixed);
}

// show 結果
function showResult(arr) {
  function calc(subValue, mainValue) {
    const result = [];
    result[0] = (subValue[0] === '0' && subValue.length !== 1) ? subValue.substr(1) : subValue;
    result[1] = (mainValue[0] === '0' && mainValue.length !== 1) ? mainValue.substr(1) : mainValue;
    if (isFinish && mainValue % 1) result[1] = isFloat(mainValue); // 小數點太多位數，進行刪減
    [inputResultTop.innerText, inputResult.innerText] = result;
  }

  // 判斷是數字鍵、還是符號
  if (!arr) calc(numOrigin, numOrigin); // 數字鍵
  else calc(arr[0], arr[1]); // 其他符號
}

calculator.addEventListener('click', (e) => {
  const value = e.target.getAttribute('data-value');
  const isClickCalc = calcAll.some(x => value === x);
  if (value === null) return;
  calculator.classList.remove('animated', 'shake', 'fast');

  numOrigin += value;

  if (value === 'AC') showResult(clickReset());
  else if (isClickCalc) showResult(clickCalc(value));
  else if (value === '=') showResult(clickResult());
  else if (isCalculated) showResult(showMainNum(value));
  else showResult();
});
