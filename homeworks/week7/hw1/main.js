const body = document.querySelector('body');
const bgColorOrgin = '#666';
let scoreArr = [];
let timeStart = 0;
let isColorChanged = false;
let isButtonShow = false;

// 改背景色
function updateBgColor() {
  if (isColorChanged || isButtonShow) return;
  isColorChanged = true;
  timeStart = new Date();
  // hsl 色彩表示 (色相, 飽和度, 明度) 後兩值固定 => 確保沒有太刺眼的顏色
  body.style.background = `hsl(${Math.floor(Math.random() * 360)}, 40%, 40%)`;
}

// 出現「 再玩一次 」按鈕
function showButton() {
  if (isButtonShow) return;
  const button = document.createElement('button');
  button.innerText = '再試一次';
  body.appendChild(button);
}

// 設置換色時間 & 倒數換色
function startTicking() {
  const randomTime = ((Math.random() * 2) + 1) * 1000;
  setTimeout(updateBgColor, randomTime);
}
startTicking();

// 更新計分板
function updateScore(score) {
  scoreArr.push(score);
  scoreArr.sort((a, b) => a - b); // 大於0，排序變b、a
  scoreArr = scoreArr.slice(0, 3);
  for (let i = 0; i < 3; i += 1) {
    document.querySelectorAll('li')[i].innerText = scoreArr[i] ? scoreArr[i] : '';
  }
}

// click 再玩一次按鈕，改回預設狀態
function clickAgainBtn() {
  startTicking();
  body.removeChild(document.querySelector('button'));
  body.style.background = bgColorOrgin;
  isColorChanged = false;
  isButtonShow = false;
}

function clickBg() {
  const timeEnd = new Date();
  if (isButtonShow) return; // 按鈕出現就不要有反應
  if (isColorChanged) {
    const score = (timeEnd - timeStart) / 1000;
    updateScore(score);
    alert(`你的成績: ${score}秒`);
  } else {
    alert('客官您很心急！');
  }
  showButton(isButtonShow);
  isButtonShow = true;
}

// click & key 事件監聽
body.onclick = (e) => {
  if (e.target.nodeName === 'BUTTON') clickAgainBtn();
  else clickBg();
};
body.onkeydown = (e) => {
  if (e.keyCode === 32) clickBg();
  if (e.keyCode === 82 && isButtonShow) clickAgainBtn();
};
