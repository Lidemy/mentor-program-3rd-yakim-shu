/* eslint-disable no-use-before-define */
/* eslint-disable arrow-body-style */
/* eslint-disable func-names */
/* eslint-disable no-undef */


// Render todo-list DOM
function render() {
  $('.check-list').empty();
  let itemHTML = '';

  obj.list.forEach((ele, index) => {
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

function getObject() {
  const obj = {};
  // todo-list:  default content ( first time )
  let list = [
    {
      content: '預設 todo',
      status: 0,
    },
    {
      content: '完成作業 3',
      status: 1,
    },
  ];

  Object.defineProperty(obj, 'list', {
    get() {
      return list;
    },

    set(value) {
      list = value;
      localStorage.setItem('todo', JSON.stringify(list));
      render();
    },
  });

  return obj;
}

const obj = getObject();

// todo-list: change content ( get from localStorage )
if (localStorage.getItem('todo')) {
  obj.list = JSON.parse((localStorage.getItem('todo')));
}

render();

function addTodo(value) {
  obj.list = [...obj.list, {
    content: value,
    status: 0,
  }];
}

function deleteTodo(index) {
  obj.list = obj.list.filter((item, i) => i !== index);
}

function changeTodoStatus(index) {
  obj.list = obj.list.map((item, i) => {
    return index !== i ? item : {
      ...item,
      status: !item.status,
    };
  });
}

// Add: new todo
$('.input-text').keydown((e) => {
  if (e.key !== 'Enter') return;
  addTodo($(e.target).val());
  $(e.target).val('');
});

// Update: todo content
$('.check-list').on('click', '.item', function (e) {
  e.preventDefault();
  const index = $(this).index();

  // 1. change todo status
  changeTodoStatus(index);

  // 2. delete todo
  if ($(e.target).hasClass('btn_delete')) {
    deleteTodo(index);
  }
});
