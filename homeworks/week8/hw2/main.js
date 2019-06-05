/* eslint-disable prefer-destructuring */
const request = new XMLHttpRequest();
const dq = element => document.querySelector(element);
const postGroup = dq('.comment__body');
const baseUrl = 'https://lidemy-book-store.herokuapp.com/posts';
const numList = 20; // 20 Msg for 1 page
let postPage = 1;

// 拿資料、渲染畫面
function RenderHtml() {
  let latestId = 0;
  let lastPage = true;
  let firstPage = false;

  Object.defineProperty(this, 'banNext', { get: () => lastPage });
  Object.defineProperty(this, 'banPrev', { get: () => firstPage });

  // prev、next 按鈕控制
  this.navControl = (currentId) => {
    if (latestId < currentId) latestId = currentId;
    lastPage = (latestId === currentId);
    firstPage = (currentId <= numList);
    dq('.next').classList = (lastPage) ? 'btn next not-allowed' : 'btn next';
    dq('.prev').classList = (firstPage) ? 'btn prev not-allowed' : 'btn prev';
  };

  // 插入一筆留言
  this.addNewPost = (msg, i) => {
    const post = document.createElement('li');
    post.innerHTML = `<span>${i} : ${msg}</span>`;
    postGroup.prepend(post);
  };

  // 跑所有資料
  this.getAllPost = (data) => {
    for (let i = data.length - 1; i >= 0; i -= 1) {
      this.addNewPost(data[i].content, data[i].id);
    }
    postGroup.classList.add('expand');
    this.navControl(data[0].id);
  };
}
const render = new RenderHtml();

// data - GET
function getObj(page) {
  return {
    method: 'GET',
    url: `${baseUrl}?_limit=20&_sort=id&_order=desc&_page=${page}`,
    load: json => render.getAllPost(json),
  };
}

// data - POST
function postObj(msg) {
  return {
    method: 'POST',
    url: baseUrl,
    content: msg,
    load: json => render.addNewPost(json.content),
  };
}

// 發送 request
function sendRequest(obj) {
  request.open(obj.method, obj.url);
  request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  request.send(obj.content);

  request.onload = () => {
    const status = request.status;
    if (status >= 200 && status < 300) {
      const json = JSON.parse(request.responseText);
      obj.load(json);
    } else {
      console.log(status, request.responseText);
    }
  };
}

// 使用者操作（ 發送訊息、更新前後頁 ）
function UserOperater() {
  // 檢查輸入框是否有內容
  this.checkInput = () => {
    const msg = dq('.input').value;
    if (msg === '') return;
    dq('.input').value = '';
    sendRequest(postObj(`content=${msg}`));
  };

  // 更新前、後頁
  this.updatePage = (sign) => {
    postPage = (sign === 'next') ? postPage -= 1 : postPage += 1;
    postGroup.innerHTML = '';
    sendRequest(getObj(postPage));
  };
}
const user = new UserOperater();

sendRequest(getObj(1));

// click 事件綁定
window.addEventListener('click', (e) => {
  e.preventDefault();
  const target = e.target.innerText;
  if (target === '送出') user.checkInput();
  else if (target === 'Next' && !render.banNext) user.updatePage('next');
  else if (target === 'Prev' && !render.banPrev) user.updatePage('prev');
});

// 輸入框按 Enter 也可以送出
dq('.input').addEventListener('keydown', (e) => {
  if (e.key === 'Enter') user.checkInput();
});
