const inputResultTop = document.querySelector('.row__result span');
const inputResult = document.querySelector('.row__result strong');
const calculator = document.querySelector('.calculator');
const numFixed = 5; // 小數點後 5 位直接刪掉

const numManage = {
  numOrigin: '',
  numResult: '',
};
const signManage = {
  calcSignAll: ['+', '-', '*', '/'],
  calcSignCurrent: '',
};
const stateManage = {
  isCalculated: false,
  isFinish: false,
  isClickCalc: false,
};
const funManage = {
  dataProcess: value => ((value[0] === '0' && value.length !== 1) ? value.substr(1) : value),
  calc: (subValue, mainValue) => {
    const result = [funManage.dataProcess(subValue), funManage.dataProcess(mainValue)];
    if (stateManage.isFinish && mainValue % 1) result[1] = funManage.isFloat(mainValue);
    [inputResultTop.innerText, inputResult.innerText] = result;
  },
  isFloat: (mainValue) => {
    const num = mainValue.toString();
    if (num.split('.')[1].length < numFixed) return mainValue;
    return Number(num).toFixed(numFixed);
  },
  doCalc: (sign, first, sec) => {
    switch (sign) {
      case '+':
        return first + sec;
      case '-':
        return first - sec;
      case '*':
        return first * sec;
      case '/':
        if (sec === 0) {
          return this.showError('無意義 🧞‍');
        }
        return first / sec;
      default:
        break;
    }
    return false;
  },
};

// click - 歸零 (AC)
function clickReset(msg) {
  if (msg) return msg;
  [stateManage.isCalculated, stateManage.isFinish] = [false, false];
  [numManage.numOrigin, numManage.numResult] = ['', ''];
  return ['0', '0'];
}

function showError(msg) {
  calculator.classList.add('shake');
  return clickReset(msg);
}
// show 結果
function showResult(arr) {
  // 判斷是數字鍵、還是符號
  if (!arr && numManage.numResult) showResult(showError()); // 數字鍵
  else if (!arr) funManage.calc(numManage.numOrigin, numManage.numOrigin);
  else funManage.calc(arr[0], arr[1]); // 其他符號
}

// click - 等於 (=)
function clickResult() {
  stateManage.isCalculated = false;
  stateManage.isFinish = true;
  const arr = numManage.numOrigin.split(signManage.calcSignCurrent);
  const numFir = Number(arr[0]);
  const numSec = Number(arr[1].substring(0, arr[1].length - 1));
  numManage.numResult = funManage.doCalc(signManage.calcSignCurrent, numFir, numSec);
  return [numManage.numOrigin, numManage.numResult];
}

// click - 加、減、乘、除 (+、-、*、/)
function clickCalc(sign) {
  signManage.calcSignCurrent = sign;
  if (numManage.numResult) numManage.numOrigin = numManage.numResult + sign;
  if (stateManage.isCalculated) return showError(['0', '哎呀幫您歸零 😘']);
  stateManage.isCalculated = true;
  return [numManage.numOrigin, sign];
}

// 已有運算符號的處理，只顯示後來的數字
function showMainNum(value) {
  if (numManage.numResult) {
    numManage.numOrigin = numManage.numResult + signManage.calcSignCurrent + value;
    numManage.numResult = '';
    stateManage.isCalculated = true;
  }
  const index = numManage.numOrigin.indexOf(signManage.calcSignCurrent);
  return [numManage.numOrigin, numManage.numOrigin.substr(index + 1)];
}

calculator.addEventListener('click', (e) => {
  calculator.classList.remove('shake');
  const value = e.target.getAttribute('data-value');
  stateManage.isClickCalc = signManage.calcSignAll.some(x => value === x);
  if (value === null) return;

  numManage.numOrigin += value;

  if (value === 'AC') showResult(clickReset());
  else if (stateManage.isClickCalc) showResult(clickCalc(value));
  else if (value === '=') showResult(clickResult());
  else if (stateManage.isCalculated) showResult(showMainNum(value));
  else showResult();
});
