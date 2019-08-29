# hw2: 串接 API

## 行前準備

把上週的 Todo-List 複製過來

整理兩個 class：
1. 當資料庫改動時，同步處理 `obj.list` 的資料 => `Todo`
2. 處理發 request 的 CRUD => `ReqControl`


### 完成慘不忍睹的義大利麵 code
Ajax 的部分不難，所以重點放在如何優化義大利麵 code
```javascript
// Render todo-list DOM
function render() {
  $('.check-list').empty();
  let itemHTML = '';

  obj.list.forEach((ele, index) => {
    const badgeClass = ele.status ? 'badge-success' : 'badge-warning';
    const badgeText = ele.status ? '完成' : '未完成';
    const checkStatus = ele.status ? "checked = 'true'" : 'false';

    itemHTML += `
        <div class="item item_${index} d-flex justify-content-between" data-id=${ele.id}>
          <input id="checkbox_${index}" type="checkbox" ${checkStatus}>
          <label for="checkbox_${index}">${ele.content}</label>
          <span class="checkbox"></span>
          <div class="btn-area">
            <a href='' class="badge badge-danger btn_delete">刪除</a>
            <a href='' class="badge badge-info btn_edit">編輯</a>
            <div class="badge badge-primary ${badgeClass} badge-state">${badgeText}</div>
          </div>
        </div>
      `;
  });
  $('.check-list').append($(itemHTML));
}

const obj = {};
let list = [];

Object.defineProperty(obj, 'list', {
  get() {
    return list;
  },

  set(value) {
    list = value;
    render();
  },
});

// => obj.list CRUD
class Todo {
  add(value, id) {
    obj.list = [...obj.list, {
      content: value,
      status: 0,
      id,
    }];
  }

  delete(index) {
    obj.list = obj.list.filter((item, i) => i !== index);
  }

  changeContent(index, value) {
    obj.list = obj.list.map((item, i) => {
      return index !== i ? item : {
        ...item,
        content: value,
      };
    });
  }

  changeStatus(index) {
    obj.list = obj.list.map((item, i) => {
      return index !== i ? item : {
        ...item,
        status: !item.status,
      };
    });
  }
}
const todo = new Todo();

// => Ajax CRUD
class ReqControl {
  constructor() {
    this.url = 'http://yakim.tw/todos/api/list';
    this.getAllTodos();
  }
  sendReq(req) {
    return $.ajax({
      dataType: 'json',
      type: req.method,
      url: req.url,
      data: JSON.stringify(req.data) || {},
    })
      .fail((jqXHR) => {
        console.log(jqXHR.status);
      });
  }

  getAllTodos() {
    this.sendReq({
      method: 'GET',
      url: this.url,
    })
      .done((res) => {
        list = res.result;
        render();
      });
  }

  addTodo(value) {
    this.sendReq({
      method: 'POST',
      url: this.url,
      data: {
        content: value,
        status: 0,
      },
    })
      .done((res) => {
        console.log('成功新增，id: ', res.result);
        todo.add(value, res.result);
        $('.input_addTodo').val('');
      });
  }

  deleteTodo(index, DOMindex) {
    this.sendReq({
      method: 'DELETE',
      url: `${this.url}/${index}`,
    })
      .done(() => {
        console.log('刪除成功');
        todo.delete(DOMindex);
      });
  }

  updateTodoStatus(index, DOMindex, oldStatus) {
    this.sendReq({
      method: 'PATCH',
      url: `${this.url}/${index}`,
      data: {
        status: !oldStatus,
      },
    })
      .done(() => {
        console.log('成功修改');
        todo.changeStatus(DOMindex);
      });
  }

  updateTodoContent(index, DOMindex, newContent) {
    this.sendReq({
      method: 'PATCH',
      url: `${this.url}/${index}`,
      data: {
        content: newContent,
      },
    })
      .done(() => {
        console.log('成功修改');
        todo.changeContent(DOMindex, newContent);
      });
  }
}
const req = new ReqControl();

// Add: new todo
$('.btn_add').on('click', function() {
  req.addTodo($('.input_addTodo').val());
});

// Update: todo content
$('.check-list').on('click', '.item', function (e) {
  e.preventDefault();
  const index = $(this).data('id');
  const DOMindex = $(this).index();
  const target = $(e.target);

  if (target.hasClass('todo-content')) return; // => 編輯內容 input

  // delete todo
  if (target.hasClass('btn_delete')) {
    req.deleteTodo(index, DOMindex);
    return;
  }

  // edit todo content
  if (target.hasClass('btn_edit')) {
    target.toggleClass('isEditing');

    if (target.hasClass('isEditing')) {
      const defaultTodo = target.parents('.item').find('label');
      defaultTodo.replaceWith(`<input class='todo-content' type='text' value='${defaultTodo.text()}'>`);
      target.text('編輯完成');
      return;
    }

    const newValue = $('.todo-content').val();
    req.updateTodoContent(index, DOMindex, newValue);
    target.text('編輯');
    return;
  }

  // change todo status
  const oldStatus = Number($(this).find('input')[0].checked);
  req.updateTodoStatus(index, DOMindex, oldStatus);

});
```

---

## 以下開始整理 code

## ☞ Q1: 按照上週的 `obj.list` 同步更新 `render()`，但現在資料儲存在資料庫，此作法好像變得多此一舉？

本來的作法：
- 頁面的資料是根據陣列 `obj.list` 去 `render()`
- 所以每當有 CRUD 操作完，也必須去更新陣列 `obj.list`，也就是 `Todo` 的 Class 在做的事

想改變的作法：
- 不用處理 `obj.list` 的資料，每次操作完都不管三七二十一，都是重新發 get 的 request 來更新畫面。
- 就是在每次請求成功之後的 callback 再呼叫一次 `.getAllTodos()`

#### 結果：成功！ 可以把整段 `Todo` 的 Class 刪掉。

缺點：因為等於是發了兩個 request，頁面的回饋時間會有點久。

```javascript
// => Ajax CRUD
class ReqControl {
  constructor() {
    this.url = 'http://yakim.tw/todos/api/list';
    this.getAllTodos();
  }

  sendReq(req) {
    return $.ajax({
      dataType: 'json',
      type: req.method,
      url: req.url,
      data: JSON.stringify(req.data) || {},
    })
      .fail((jqXHR) => {
        console.log('失敗： ', jqXHR.status);
      });
  }

  getAllTodos() {
    this.sendReq({
      method: 'GET',
      url: this.url,
    })
      .done((res) => {
        render(res.result);
      });
  }

  addTodo(value) {
    this.sendReq({
      method: 'POST',
      url: this.url,
      data: {
        content: value,
        status: 0,
      },
    })
      .done((res) => {
        console.log('成功新增，id: ', res.result);
        $('.input_addTodo').val('');
        this.getAllTodos();
      });
  }

  deleteTodo(index, DOMindex) {
    this.sendReq({
      method: 'DELETE',
      url: `${this.url}/${index}`,
    })
      .done(() => {
        console.log('刪除成功');
        this.getAllTodos();
      });
  }

  updateTodoStatus(index, DOMindex, oldStatus) {
    this.sendReq({
      method: 'PATCH',
      url: `${this.url}/${index}`,
      data: {
        status: !oldStatus,
      },
    })
      .done(() => {
        console.log('成功修改狀態');
        this.getAllTodos();
      });
  }

  updateTodoContent(index, DOMindex, newContent) {
    this.sendReq({
      method: 'PATCH',
      url: `${this.url}/${index}`,
      data: {
        content: newContent,
      },
    })
      .done(() => {
        console.log('成功修改內容');
        this.getAllTodos();
      });
  }
}
const req = new ReqControl();

```

---

## ☞ Q2: 監聽按鈕操作的程式碼好亂，想辦法整理

理想是按下 `$('.item')` ( 除了按鈕以外的部分 ) 都可以更新狀態，因為 checkbox 有點小不好勾，但這樣裡面的按鈕操作都只能集合再一起寫，理想是可以把監聽部分切開。

##### ➜ 原本亂七八糟的樣子
```javascript
// Add: new todo
$('.btn_add').on('click', () => {
  req.addTodo($('.input_addTodo').val());
});

// Update: todo content
$('.check-list').on('click', '.item', function (e) {
  e.preventDefault();
  const index = $(this).data('id');
  const target = $(e.target);

  if (target.hasClass('todo-content')) return; // => 編輯內容 input

  // delete todo
  if (target.hasClass('btn_delete')) {
    req.deleteTodo(index);
    return;
  }

  // edit todo content
  if (target.hasClass('btn_edit')) {
    target.toggleClass('isEditing');

    if (target.hasClass('isEditing')) {
      const defaultTodo = target.parents('.item').find('label');
      defaultTodo.replaceWith(`<input class='todo-content' type='text' value='${defaultTodo.text()}'>`);
      target.text('編輯完成');
      return;
    }

    const newValue = $('.todo-content').val();
    req.updateTodoContent(index, newValue);
    target.text('編輯');
    return;
  }

  // change todo status
  const oldStatus = Number($(this).find('input')[0].checked);
  req.updateTodoStatus(index, oldStatus);
});
```

##### ➜ 理想

```javascript
function changeTodoStatus() {
    ....
}
function deleteTodo() {
    ....
}
function updateTodoContent() {
    ....
}
function addTodo() {
    ....
}

$('.check-list').on('click', '.item', changeTodoStatus);
$('.check-list').on('click', '.btn_delete', deleteTodo);
$('.check-list').on('click', '.btn_edit', updateTodoContent);
$('.check-list').on('click', '.btn_add', addTodo);
```

---

#### 遇到問題（一）： `changeTodoStatus()` 修改狀態要排除 `$('.item')` 裡面的按鈕

用 jQuery 提供的 `.is()`

1. 其實用 `.hasClass()` 或 `.is()` 都可以把不要選到的元素排除
    - 差別在於 `.hasClass()` 只能放一個字串
    - 而`.is()` 更通用，可以放多個 elements，要記得加上選擇器符號 `.` or `#`
2. 強制把 target 變成 `$('item')`，後面比較好操作

```javascript
function changeTodoStatus() {
    // 1.
    if (target.is('.btn_delete, .btn_edit, .todo-content')) return;
    
    // 2.
    if (!target.is('.item')) {
        target = target.parents('.item');
    }
    
    ...
}
```

參考資料：
- [.not()](https://api.jquery.com/not/)
- [.is()](https://api.jquery.com/is/)


#### 遇到問題（一）： 分開後不好取得 id

本來用事件代理的方式，每個按鈕都直接取 `$('.item')` 的 `id`，分開後 function 的 `this` 就變成 `window` 而不是按鈕本身，造成 `id` 的取得問題。

例如以下，deleteTodo 無法取得 `id`
```javascript
$('.check-list').on('click', '.btn_delete', deleteTodo);
```

☞ 解決方法： 用 `.call()` 把事件資訊 `e` 傳進去當作 `this`

```javascript
function deleteTodo() {
  const index = $(this.target).parents('.item').data('id');
  req.deleteTodo(index);
}

$('.check-list').on('click', '.btn_delete', (e) => deleteTodo.call(e) );
```

( 但這樣等於每個需要 `id` 的按鈕都要這樣傳，且閱讀性很差 )

---

#### 成果： 改完雖然有比較整齊，但冗碼好像更多...

因為每個有用到 index 跟 target 的操作都要重寫

```javascript
// add
function addTodo() {
  req.addTodo($('.input_addTodo').val());
}

// delete
function deleteTodo() {
  const index = $(this.target).parents('.item').data('id');
  req.deleteTodo(index);
}

// update content
function updateTodo() {
  const target = $(this.target);
  const index = target.parents('.item').data('id');
  target.toggleClass('isEditing');

  if (target.hasClass('isEditing')) {
    const defaultTodo = target.parents('.item').find('label');
    defaultTodo.replaceWith(`<input class='todo-content' type='text' value='${defaultTodo.text()}'>`);
    target.text('編輯完成');
    return;
  }

  const newValue = $('.todo-content').val();
  req.updateTodoContent(index, newValue);
  target.text('編輯');
}

// update status
function changeTodoStatus() {
  let target = $(this.target);
  if (target.is('.btn_delete, .btn_edit, .todo-content')) return;
  if (!target.is('.item')) {
    target = target.parents('.item');
  }

  const index = target.data('id');
  const oldStatus = Number(target.find('input')[0].checked);
  req.updateTodoStatus(index, oldStatus);
}

$('.btn_add').on('click', addTodo);
$('.check-list').on('click', '.btn_delete', (e) => deleteTodo.call(e) );
$('.check-list').on('click', '.btn_edit', (e) => updateTodo.call(e) );
$('.check-list').on('click', '.item', (e) => changeTodoStatus.call(e));
```

---

## 越看越不對勁，決定把兩版混合

- 沿用事件代理，只是把每個操作都獨立成一個 function 
- 再把命名整理一下

```javascript
/* ----- Todo CRUD 操作 ------ */
// add
function addTodo() {
  const value = $('.input_addTodo').val();
  todoRequest.add(value);
}

// delete
function deleteTodo(index) {
  todoRequest.delete(index);
}

// update content
function updateTodoContent(index, target) {
  target.toggleClass('isEditing');

  if (target.hasClass('isEditing')) {
    const defaultTodo = target.parents('.item').find('label');
    defaultTodo.replaceWith(`<input class='todo-content' type='text' value='${defaultTodo.text()}'>`);
    target.text('編輯完成');
    return;
  }

  const newValue = $('.todo-content').val();
  todoRequest.updateContent(index, newValue);
  target.text('編輯');
}

// update status
function updateTodoStatus(index, target) {
  const todo = target.is('.item') ? target : target.parents('.item');
  const oldStatus = Number(todo.find('input')[0].checked);
  todoRequest.updateStatus(index, oldStatus);
}

/* ----- 綁定操作 ------ */
$('.btn_add').on('click', addTodo);

$('.check-list').on('click', '.item', function (e) {
  e.preventDefault();
  const index = $(this).data('id');
  const target = $(e.target);
  if (target.is('.todo-content')) return; // => 編輯內容 input

  if (target.is('.btn_delete')) {
    deleteTodo(index);
    return;
  }

  if (target.is('.btn_edit')) {
    updateTodoContent(index, target)
    return;
  }

  updateTodoStatus(index, target)
});
```
