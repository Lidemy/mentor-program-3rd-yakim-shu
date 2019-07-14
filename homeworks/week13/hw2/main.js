/* eslint-disable func-names */
/* eslint-disable no-undef */

$(document).ready(() => {
  $('.input-text').keydown((e) => {
    // 插入資料
    if (e.key === 'Enter') {
      const text = $(e.target).val();
      if (!text) return;

      const item = `
        <div class="item d-flex justify-content-between">
          <input id="${text}" type="checkbox">
          <label for="${text}">${text}</label>
          <span></span>
          <div>
            <a href='' class="badge badge-danger btn_delete">刪除</a>
            <div class="badge badge-primary badge-warning badge-state">未完成</div>
          </div>
        </div>
      `;

      $('.check-list').prepend($(item).hide().fadeIn(400));
      $(e.target).val('');
    }
  });

  $('.check-list').on('click', '.item', function (e) {
    e.preventDefault();
    const target = $(e.target);
    if (target.hasClass('btn_delete')) {
      target.parent().parent().remove();
      return;
    }

    const item = $(this);
    item
      .toggleClass('finish')
      .find('.badge-state')
      .toggleClass('badge-info badge-warning')
      .text(item.hasClass('finish') ? '完成' : '未完成');

    input = item.find('input');
    input.prop('checked', !input.prop('checked'));
  });
});
