/* eslint-disable class-methods-use-this */
/* eslint-disable no-use-before-define */
/* eslint-disable arrow-body-style */
/* eslint-disable func-names */
/* eslint-disable no-undef */

// Render todo-list DOM
function render() {
  $('.check-list').empty();
  let itemHTML = '';

  obj.list.forEach((ele, index) => {
    const badgeClass = ele.status ? 'badge-success' : 'badge-warning';
    const badgeText = ele.status ? '完成' : '未完成';
    const checkStatus = ele.status ? "checked ='true'" : '';

    itemHTML += `
        <div class="item item_${index} d-flex justify-content-between" data-id=${ele.id}>
          <input id="checkbox_${index}" type="checkbox" ${checkStatus}>
          <label for="checkbox_${index}">${escapeHtml(ele.content)}</label>
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
$('.btn_add').on('click', () => {
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
