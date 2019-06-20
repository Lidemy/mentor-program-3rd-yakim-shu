/* eslint-disable no-use-before-define */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-underscore-dangle */
const body = document.querySelector('body');
const button = document.querySelector('button');

/* --------------------
  < Score: 分數表 >
  property: scoreBoard
  method: add, _update
-------------------- */

class Score {
  constructor() {
    this.scoreBoard = [];
  }

  add(score) {
    this.scoreBoard.push(score);
    this._update(3);
  }

  _update(nunList) {
    this.scoreBoard.sort((a, b) => a - b); // 大於0，排序變b、a
    this.scoreBoard = this.scoreBoard.slice(0, nunList);
    for (let i = 0; i < nunList; i += 1) {
      document.querySelectorAll('li')[i].innerText = this.scoreBoard[i] || '';
    }
  }
}
const scoreList = new Score();

/* --------------------
  < Result: 結果 >
  property: isEnd
  method: show, _success, _failed
-------------------- */

class Result {
  constructor() {
    this.isEnd = false;
  }

  show() {
    this.isEnd = true;
    button.classList.remove('hide');
    if (elementBody.isBgChanged) this._success();
    else this._failed();
  }

  _success() {
    const score = (new Date() - game.startTime) / 1000;
    scoreList.add(score);
    alert(`你的成績: ${score}秒`);
  }

  _failed() {
    alert('客官您很心急！');
  }
}
const result = new Result();

/* --------------------
  < Body: body 元素 >
  property: isBgChanged
  method: changeBg
-------------------- */

class Body {
  constructor() {
    this.isBgChanged = false;
  }

  changeBg() {
    if (this.isBgChanged || result.isEnd) return;
    this.isBgChanged = true;
    body.style.background = `hsl(${Math.floor(Math.random() * 360)}, 40%, 40%)`;
  }
}
const elementBody = new Body();

/* --------------------
  < Game: 遊戲控制 >
  property: startTime
  method: startGame, _resetGame
-------------------- */

class Game {
  constructor() {
    this.startTime = 0;
    this.startGame();
  }

  startGame() {
    this._resetGame();
    setTimeout(() => {
      this.startTime = new Date();
      elementBody.changeBg();
    }, ((Math.random() * 2) + 1) * 1000);
  }

  _resetGame() {
    elementBody.isBgChanged = false;
    result.isEnd = false;
    button.classList.add('hide');
    body.style.background = '#666';
  }
}
const game = new Game();

// click & key 事件監聽 --------------------

body.onclick = (e) => {
  if (e.target.nodeName === 'BUTTON') game.startGame();
  else if (!result.isEnd) result.show();
};
body.onkeydown = (e) => {
  if (e.key === ' ' && !result.isEnd) result.show();
  if (e.key === 'r') game.startGame();
};
