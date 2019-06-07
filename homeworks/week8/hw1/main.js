/* eslint-disable prefer-destructuring */
const request = new XMLHttpRequest();
const dq = element => document.querySelector(element);

const prizeObj = {
  FIRST: ['恭喜你中頭獎了！日本東京來回雙人遊！', 'prize_first.png', 'theme--first'],
  SECOND: ['二獎！90 吋電視一台！', 'prize_tv.png', 'theme--second'],
  THIRD: ['恭喜你抽中三獎：知名 YouTuber 簽名握手會入場券一張，bang！', 'prize_youtube.png', 'theme--third'],
  NONE: ['銘謝惠顧', '', 'theme--none'],
};


function renderHtml(type) {
  dq('button').innerText = '再抽一次！';
  dq('h2').innerText = prizeObj[type][0];
  dq('body').className = `show ${prizeObj[type][2]}`;
  if (prizeObj[type][1]) {
    dq('.pic img').setAttribute('src', `image/${prizeObj[type][1]}`);
  } else {
    dq('.pic').classList.add('hide');
  }
}

function handleError() {
  alert('系統不穩定，請再試一次');
}

function sendRequest() {
  request.open('GET', 'https://dvwhnbka7d.execute-api.us-east-1.amazonaws.com/default/lottery');
  request.send();
}
sendRequest();


function clickBtn(e, json) {
  if (e.target.innerText === '再抽一次！') {
    window.location.reload();
  } else {
    sendRequest();
    renderHtml(json.prize);
  }
}

request.onload = () => {
  if (request.status >= 200 && request.status <= 300) {
    const json = JSON.parse(request.responseText);
    dq('button').addEventListener('click', e => clickBtn(e, json));
  } else {
    handleError();
  }
};
