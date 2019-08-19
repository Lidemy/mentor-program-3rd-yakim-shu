/* eslint-disable func-names */
/* eslint-disable no-undef */

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
