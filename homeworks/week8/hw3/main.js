const request = new XMLHttpRequest();
const dq = element => document.querySelector(element);
const token = '11gzim2pdteu8xr2p6qgotmuiur42i';
const numList = 20; // 20 post for a page
const url = `https://api.twitch.tv/kraken/streams?limit=${numList}&game=`;
const gameArr = [];
let offset = 0;
let gameCurrent = '';

// 確認 response 狀態
function checkResStatus(res) {
  if (res.status >= 200 && res.status < 300) {
    return JSON.parse(request.responseText);
  }
  console.log(res.status);
  return false;
}

function renderStreamPost(json) {
  console.log(json);
  const data = json.streams;
  const item = dq('.origin');
  dq('.title').innerText = data[0].channel.game;

  for (let i = 0; i < data.length; i += 1) {
    item.outerHTML = `
      <a class='stream_item' href='https://www.twitch.tv/${data[i].channel.name}' target='_blank'>
        <div class="stream_pic"><img src="${data[i].preview.large}" alt=""></div>
        <div class="stream_info">
          <div class="stream__avatar"><img src="${data[i].channel.logo}" alt=""></div>
          <div class="group">
            <h4 class="stream__title">${data[i].channel.status}</h4>
            <p class="stream__name">${data[i].channel.name}</p>
          </div>
        </div>
      </a>
      `;
    dq('.stream').appendChild(item);
  }
}

function removeAllPost() {
  if (dq('.stream_item')) {
    dq('.stream').innerText = '';
    const node = document.createElement('a');
    node.classList = 'origin hide';
    dq('.stream').append(node);
  }
}

function getStreamPost(name) {
  gameCurrent = name;
  request.open('GET', `${url}${name}&offset=${offset}`);
  request.setRequestHeader('Client-ID', token);
  request.send();
  request.onload = () => {
    if (!offset) removeAllPost();
    renderStreamPost(checkResStatus(request));
    console.log(JSON.parse(request.responseText));
  };
}

// 渲染前五名頻道
function renderNav(json) {
  if (!checkResStatus) return;
  const li = document.querySelectorAll('.nav li');
  json.top.forEach((element, i) => {
    li[i].innerText = element.game.name;
    gameArr.push(element.game.name);
  });
  getStreamPost(gameArr[0]); // 預設：最熱門的頻道
}

(function getTopStreams() {
  request.open('GET', 'https://api.twitch.tv/kraken/games/top?limit=5');
  request.setRequestHeader('Client-ID', token);
  request.send();
  request.onload = () => renderNav(checkResStatus(request));
}());

// 選單操作 - 切換頻道
dq('.nav').addEventListener('click', (e) => {
  if (e.target.nodeName === 'LI') { // 按鈕 - nav 選單
    offset = 0;
    getStreamPost(e.target.innerText);
  }
  if (e.target.nodeName === 'SPAN') { // 搜尋框提示
    dq('input').value = e.target.innerText;
    dq('.prompt').innerHTML = '';
  }
  if (e.target.nodeName === 'BUTTON') { // 按鈕 - 搜尋送出
    offset = 0;
    getStreamPost(dq('input').value);
  }
});

// 搜尋操作 - 產生提示框
function inputCheck(value) {
  dq('.prompt').innerHTML = '';
  for (let i = 0; i < gameArr.length; i += 1) {
    const re = new RegExp(value, 'i');
    if (re.test(gameArr[i])) {
      const node = document.createElement('span');
      node.innerText = gameArr[i];
      dq('.prompt').prepend(node);
    }
  }
}

dq('input').addEventListener('keydown', (e) => {
  inputCheck(dq('input').value + e.key);
});

// 無限滾動
window.addEventListener('scroll', () => {
  const html = document.documentElement;
  // 視窗高 + 滾動高度 >= 頁面總高度 - 緩衝
  if ((window.innerHeight + html.scrollTop) >= html.scrollHeight - 10) {
    offset += (numList - 1);
    getStreamPost(gameCurrent);
  }
});
