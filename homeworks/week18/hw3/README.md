## 作業規範
之前在第十三週時已經讓大家寫過一個 todo list，這次我們要來點不一樣的。

其實有一種寫法非常直覺，而且寫起來非常方便，那就是「只要資料更新，我就全部重新 render」。

什麼意思呢？之前我們寫第七週的作業時，新增的話就是新增一筆資料，然後在 DOM 上面 append，刪除的話就是直接把 DOM 上面的那筆元素刪掉。

可是其實還有另外一種做法，用程式碼示意的話會長這樣：

```javascript
var list = []
function addTodo(todo) {
  list.push(todo)
  render()
}

function removeTodo(id) {
  list = list.filter(item => item.id !== id)
  render()
}

function render(){
  $('.todo-list').empty()
  $('.todo-list').append(list.map(item => `<li>${todo.content}</li>`)) // 示意
}
```

每次只要資料有更新，你就更新資料就好，然後把畫面全部重新渲染。如此一來的好處就是你完全不用管 DOM，你只要更新程式裡面的資料即可。

現在請你把之前實作的 Todo list 改成這種形式，更新資料並且 re-render。

---

### 行前準備

看到題目，想說這好像是前端框架的功能之一：數據雙向綁定（ 不確定有沒有誤解 ），難道是要我們先模擬前端框架在做的事，以後就會懂它的好（？）

雖然題目的程式碼示意是「 當執行更新的函式時，立刻呼叫 `render()` 」

但我猜測可以像是 `gulp watch sass` 一樣，只是監測的檔案由 CSS 變成 JS，且監測的時機是在網頁上也可以 watch todo-list 內容、而不是開發階段

意思是說希望可以把 `render()` 這動作交由程式去控制、當成一個 callback function，而不用自己呼叫。

丟了 `watch js 改變` 當關鍵字之後，大部分都是關於 `Vue` 的文章，但還是冒出幾種感覺可行的方向：
- [Watch.js](https://github.com/melanke/Watch.JS/)
    - [watch.js 源码解读](http://zencode.in/4.watch-js%E6%BA%90%E7%A0%81%E8%A7%A3%E8%AF%BB.html)
- [Object.prototype.watch()](https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Global_Objects/Object/watch)
- [如何监听 js 中变量的变化?](https://www.zhihu.com/question/44724640)

---

### 開始動工

此作業的步驟如下：
1. 先規劃如何存 todo 的值
2. 載入網頁、render 資料
3. 測試有沒有辦法 watch JavaScript 的 Object
4. UI : 新增 todo
5. UI : 更改 todo 狀態
6. 想要把資料儲存起來: LocalStorage


### （ 一 ） 先規劃如何存 todo 的值

把之前作業 w13 copy 過來，w13 的版本資料是儲存在 html 上的，JavaScript 只有拿來更改資料而已，並沒有作儲存資料。

所以第一步：把 todo-list 的資料放進 JS 陣列裡。

1. 新建一個 obj : `list`
    - 會用 Object 而不是 array 是因為 `Object.prototype.watch()` 看起來只對 Object 的屬性有用
2. 規劃 list 所需要紀錄的資訊
    - `代辦事項內容` : `string`
    - `完成 | 未完成` : `int` ( 有其他狀態還可以擴充 )

`list` 資料結構示意圖：

```javascript
list = {
    item : [
        {
            content: '早睡早起',
            status: 0
        },
        {
            content: '完成作業 3',
            status: 1
        },
    ]
}
```

## （ 二 ） 載入網頁、render 資料

1. html 內容清空，都改成 js render 
2. 定義好 list 內容，一載入網頁就會初始化 todo-list

```javascript
// todo-list:  default content
const list = {
  item: [
    {
      content: '早睡早起',
      status: 0,
    },
    {
      content: '完成作業 3',
      status: 1,
    },
  ],
  test: 5,
};

// Render todo-list DOM
function render() {
  $('.check-list').empty();
  list.item.forEach((ele, index) => {
    const bagdgeClass = ele.status ? 'badge-info' : 'badge-warning';
    const bagdgeText = ele.status ? '完成' : '未完成';

    const item = `
        <div class="item item_${index} d-flex justify-content-between">
          <input id="${index}" type="checkbox">
          <label for="${index}">${ele.content}</label>
          <span></span>
          <div>
            <a href='' class="badge badge-danger btn_delete">刪除</a>
            <div class="badge badge-primary ${bagdgeClass} badge-state">${bagdgeText}</div>
          </div>
        </div>
      `;

    $('.check-list').append($(item).hide().fadeIn(400));
  });
}
render();
```

---

## （ 三 ） 測試有沒有辦法 watch JavaScript 的 Object

### 嘗試 1: 使用 `Object.prototype.watch()` 監測 `list.item`
開始綁定 watch，直接拿 MDN 的範例測試

```javascript
list.watch('item', function (id, oldval, newval) {
    console.log('list.' + id + ' changed from ' + oldval + ' to ' + newval);
    return newval;
  });
```

出現以下錯誤

```
Uncaught TypeError: list.watch is not a function
```

猜測會不會是屬性值是陣列的關係？ 

嘗試： 改成字串試試？

> 不行，還是報錯


#### `Object.prototype.watch()` 使用 => 宣告失敗

---

### 嘗試 2:  試試引入 watch.js

照著 [文件範例](https://github.com/melanke/Watch.JS/) 做：

```javascript
watch(list, 'item', (prop, action, newvalue, oldvalue) => {
    console.log('newMsg: ', newvalue); // => newMsg:  hey
    console.log('oldMsg: ', oldvalue); // => oldMsg:  早睡早起
    render();
});

list.item[0].content = 'hey';
```

> 成功！！😍

太棒了，有隨著更改 `list.item` 的值執行 callback function

接下來只要把使用者更改 input 的動作直接修改 `list.item` 就大功告成了。

---

## （ 四 ） UI : 新增 todo
直接把之前的程式碼拿來修改，把處理 DOM 的程式碼刪掉。

差別在於有 watch `list.item`，所以不用再自己 call `render()`，專心處理資料，把新增的內容 push 進 `list.item` 就好：

```javascript
// Add: new todo
$('.input-text').keydown((e) => {
  if (e.key === 'Enter') {
    list.item.push({
      content: $(e.target).val(),
      status: 0,
    });
    $(e.target).val('');
  }
});
```

---

## （ 五 ） UI : 更改 todo 狀態

一樣是專心處理資料。

要把 DOM 的 todo 順序跟 `list.item` 對應起來，所以先找出當前的 todo `index`

1. 改變 `完成 | 未完成` 的狀態
2. 刪除 todo

```javascript
// Update: todo content
$('.check-list').on('click', '.item', function (e) {
  e.preventDefault();
  const index = $(this).index();

  // => 1. change todo status
  list.item[index].status = list.item[index].status ? 0 : 1;

  // => 2. delete todo
  if ($(e.target).hasClass('btn_delete')) {
    list.item.splice(index, 1);
  }
});
```

##### 順便複習常用方法

- jQuery 查詢 element 的序： `$(element).index()`
- JavaScript 刪除陣列元素： `array.splice(<item-index>, <item-num>)`
    - 在原本陣列中執行，不用回傳值

---

### （ 六 ）差不多完成了，但想要把資料儲存起來

希望能把資料存在 localStorage。

> 遇到問題： 但不能直接存 Object，資料會變成 `[object object]`，所以要轉成 JSON

- 曾經造訪過網站的話，資料從 localStorage 拿
    - 用 `JSON.parse()` 轉回 Object

```javascript
// todo-list get from localStorage
if (localStorage.getItem('todo')) {
  list = JSON.parse((localStorage.getItem('todo')));
}
```

- 一但資料有更動，就更新 localStorage 內容
    - 用 `JSON.stringify()` 轉成 JSON

```javascript
// Watch todo: if content change => update localStorage & call render()
watch(list, 'item', () => {
  render();
  localStorage.setItem('todo', JSON.stringify(list));
});
```

---

## 大功告成！

```javascript
// todo-list:  default content ( first time )
let list = {
  item: [
    {
      content: '預設 todo',
      status: 0,
    },
    {
      content: '完成作業 3',
      status: 1,
    },
  ],
  test: 5,
};

// todo-list: change content ( get from localStorage )
if (localStorage.getItem('todo')) {
  list = JSON.parse((localStorage.getItem('todo')));
}

// Render todo-list DOM
function render() {
  $('.check-list').empty();
  let itemHTML = '';

  list.item.forEach((ele, index) => {
    const badgeClass = ele.status ? 'badge-info' : 'badge-warning';
    const badgeText = ele.status ? '完成' : '未完成';
    const checkStatus = ele.status ? "checked = 'true'" : '';

    itemHTML += `
        <div class="item item_${index} d-flex justify-content-between">
          <input id="checkbox_${index}" type="checkbox" ${checkStatus}>
          <label for="checkbox_${index}">${ele.content}</label>
          <span></span>
          <div>
            <a href='' class="badge badge-danger btn_delete">刪除</a>
            <div class="badge badge-primary ${badgeClass} badge-state">${badgeText}</div>
          </div>
        </div>
      `;
  });
  $('.check-list').append($(itemHTML));
}
render();

// Watch todo: if content change => update localStorage & call render()
watch(list, 'item', () => {
  localStorage.setItem('todo', JSON.stringify(list));
  render();
});

// Add: new todo
$('.input-text').keydown((e) => {
  if (e.key === 'Enter') {
    list.item.push({
      content: $(e.target).val(),
      status: 0,
    });
    $(e.target).val('');
  }
});

// Update: todo content
$('.check-list').on('click', '.item', function (e) {
  e.preventDefault();
  const index = $(this).index();

  // 1. change todo status
  list.item[index].status = list.item[index].status ? 0 : 1;

  // 2. delete todo
  if ($(e.target).hasClass('btn_delete')) {
    list.item.splice(index, 1);
  }
});

```