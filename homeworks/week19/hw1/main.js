/* eslint-disable class-methods-use-this */
/* eslint-disable no-use-before-define */
/* eslint-disable arrow-body-style */
/* eslint-disable func-names */
/* eslint-disable no-undef */

// Ajax
function sendReq(req) {
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

const url = 'http://yakim.tw/todos/api/list';

// Render todo-list DOM
function render() {
  $('.check-list').empty();
  let itemHTML = '';

  obj.list.forEach((ele, index) => {
    const badgeClass = Number(ele.status) ? 'badge-info' : 'badge-warning';
    const badgeText = Number(ele.status) ? '完成' : '未完成';
    const checkStatus = Number(ele.status) ? "checked = 'true'" : 'false';

    itemHTML += `
        <div class="item item_${index} d-flex justify-content-between" data-id=${ele.id}>
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

  changeStatus(index) {
    obj.list = obj.list.map((item, i) => {
      return index !== i ? item : {
        ...item,
        status: !Number(item.status),
      };
    });
  }
}
const todo = new Todo();


class ReqControl {
  constructor() {
    this.getAllTodos();
  }

  getAllTodos() {
    sendReq({
      method: 'GET',
      url,
    })
      .done((res) => {
        list = res.result;
        render();
      });
  }

  addTodo(value) {
    sendReq({
      method: 'POST',
      url,
      data: {
        content: value,
        status: 0,
      },
    })
      .done((res) => {
        console.log('成功新增，id: ', res.result);
        todo.add(value, res.result);
      });
  }

  deleteTodo(index, DOMindex) {
    sendReq({
      method: 'DELETE',
      url: `${url}/${index}`,
    })
      .done(() => {
        console.log('刪除成功');
        todo.delete(DOMindex);
      });
  }

  updateTodoStatus(index, DOMindex, oldStatus) {
    sendReq({
      method: 'PATCH',
      url: `${url}/${index}`,
      data: {
        status: oldStatus ? 0 : 1,
      },
    })
      .done(() => {
        console.log('成功修改');
        todo.changeStatus(DOMindex);
      });
  }
}
const req = new ReqControl();


// Add: new todo
$('.input-text').keydown((e) => {
  if (e.key !== 'Enter') return;
  req.addTodo($(e.target).val());
  $(e.target).val('');
});

// Update: todo content
$('.check-list').on('click', '.item', function (e) {
  e.preventDefault();
  const index = $(this).data('id');
  const DOMindex = $(this).index();

  // 1. change todo status
  const oldStatus = $(this).find('input')[0].checked;
  req.updateTodoStatus(index, DOMindex, oldStatus);

  // 2. delete todo
  if ($(e.target).hasClass('btn_delete')) {
    req.deleteTodo(index, DOMindex);
  }
});
