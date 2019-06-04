/* eslint-disable prefer-destructuring */
const request = new XMLHttpRequest();
const dq = element => document.querySelector(element);
const postGroup = dq('.comment__body');
const url = 'https://lidemy-book-store.herokuapp.com/posts';
const numList = 20; // 20 item for 1 page
let postPage = 1;
let latestId = 0;
let lastPage = true;
let firstPage = false;

// prev、next 按鈕控制
function navControl(currentId) {
  if (latestId < currentId) latestId = currentId;
  lastPage = (latestId === currentId);
  firstPage = (currentId <= numList);
  dq('.next').classList = (lastPage) ? 'btn next not-allowed' : 'btn next';
  dq('.prev').classList = (firstPage) ? 'btn prev not-allowed' : 'btn prev';
}

// 插入一筆留言
function addNewPost(msg, i) {
  const post = document.createElement('li');
  post.innerHTML = `<span>${i} : ${msg}</span>`;
  postGroup.prepend(post);
}
// 跑所有資料
function getAllPost(data) {
  for (let i = data.length - 1; i >= 0; i -= 1) {
    addNewPost(data[i].content, data[i].id);
  }
  postGroup.classList.add('expand');
  navControl(data[0].id);
}

// data - GET
const getObj = {
  method: 'GET',
  url: `${url}?_limit=20&_sort=id&_order=desc&_page=1`,
  load: json => getAllPost(json),
};

// data - POST
const postObj = {
  method: 'POST',
  url: 'https://lidemy-book-store.herokuapp.com/posts',
  msg: '',
  load: json => addNewPost(json.content),
};

// 發送 request
function sendRequest(obj) {
  request.open(obj.method, obj.url);
  request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  request.send(obj.msg);
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

// 檢查輸入框是否有內容
function checkInput() {
  const msg = dq('.input').value;
  if (msg === '') return;
  dq('.input').value = '';
  postObj.msg = `content=${msg}`;
  sendRequest(postObj);
}

// 更新前、後頁留言
function updatePage(e, page) {
  e.preventDefault();
  postPage = (page === 'next') ? postPage -= 1 : postPage += 1;
  getObj.url = `${url}?_limit=${numList}&_sort=id&_order=desc&_page=${postPage}`;
  postGroup.innerHTML = '';
  sendRequest(getObj);
}

sendRequest(getObj);

// click 事件綁定
window.addEventListener('click', (e) => {
  if (e.target.nodeName === 'BUTTON') checkInput();
  if (e.target.getAttribute('data-btn') === 'next' && !lastPage) {
    updatePage(e, 'next');
  } else if (e.target.getAttribute('data-btn') === 'prev' && !firstPage) {
    updatePage(e, 'prev');
  }
});
// 輸入框按 Enter 也可以送出
dq('.input').addEventListener('keydown', (e) => {
  if (e.key === 'Enter') checkInput();
});
