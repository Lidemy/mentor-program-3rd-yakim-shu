/* eslint-disable class-methods-use-this */
/* eslint-disable no-use-before-define */
/* eslint-disable arrow-body-style */
/* eslint-disable func-names */
/* eslint-disable no-undef */

// Render todo-list DOM
function render(list) {
  $('.check-list').empty();
  let itemHTML = '';

  list.forEach((ele, index) => {
    const badgeClass = ele.status ? 'badge-success' : 'badge-warning';
    const badgeText = ele.status ? '完成' : '未完成';
    const checkStatus = ele.status ? "checked ='true'" : '';

    itemHTML += `
        <div class="item item_${index} d-flex justify-content-between" data-id=${ele.id}>
          <input id="checkbox_${index}" type="checkbox" ${checkStatus}>
          <label for="checkbox_${index}">${escapeHtml(ele.content)}</label>
          <span class="checkbox"></span>
          <div class="btn-area">
            <a class="badge badge-danger btn_delete">刪除</a>
            <a class="badge badge-info btn_edit">編輯</a>
            <div class="badge badge-primary ${badgeClass} badge-state">${badgeText}</div>
          </div>
        </div>
      `;
  });
  $('.check-list').append($(itemHTML));
}

/* ----- Ajax Send Request ------ */
class TodoRequest {
  constructor() {
    this.url = 'http://yakim.tw/todos/api/list';
    this.getAll();
  }

  sendReq(req) {
    return $.ajax({
      dataType: 'json',
      type: req.method,
      url: req.url,
      data: JSON.stringify(req.data) || {},
    })
      .fail((jqXHR) => {
        console.log('失敗： ', jqXHR.responseJSON);
      });
  }

  getAll() {
    this.sendReq({
      method: 'GET',
      url: this.url,
    })
      .done((res) => {
        render(res.result);
      });
  }

  add(value) {
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
        this.getAll();
      });
  }

  delete(index) {
    this.sendReq({
      method: 'DELETE',
      url: `${this.url}/${index}`,
    })
      .done(() => {
        console.log('刪除成功');
        this.getAll();
      });
  }

  updateStatus(index, oldStatus) {
    this.sendReq({
      method: 'PATCH',
      url: `${this.url}/${index}`,
      data: {
        status: !oldStatus,
      },
    })
      .done(() => {
        console.log('成功修改狀態');
        this.getAll();
      });
  }

  updateContent(index, newContent) {
    this.sendReq({
      method: 'PATCH',
      url: `${this.url}/${index}`,
      data: {
        content: newContent,
      },
    })
      .done(() => {
        console.log('成功修改內容');
        this.getAll();
      });
  }
}
const todoRequest = new TodoRequest();


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
    updateTodoContent(index, target);
    return;
  }

  updateTodoStatus(index, target);
});
