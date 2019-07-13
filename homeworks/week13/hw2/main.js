/* eslint-disable func-names */
/* eslint-disable no-undef */

$(document).ready(() => {
  $('.container').hide().fadeIn(1500);
  $('.input-text').keydown((e) => {
    // 插入資料
    if (e.key === 'Enter') {
      const text = $(e.target).val();
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

      $('.check-list').prepend(item);
      $(e.target).val('');
    }
  });


  // $('.card').on('click', '.card-title', function (e) {
  //   console.log('ddd');
  //   // e.preventDefault();
  //   const title = $(this);
  //   const text = title.text();
  //   console.log(text);
  // });

  $('.check-list').on('click', '.item', function (e) {
    e.preventDefault();
    const target = $(e.target);
    if (target.hasClass('btn_delete')) {
      target.parent().parent().remove();
      return;
    }

    const item = $(this);
    const badge = item.find('.badge-state');
    item.toggleClass('finish');
    badge.toggleClass('badge-info').toggleClass('badge-warning');

    const str = item.hasClass('finish') ? '完成' : '未完成';
    badge.text(str);

    if (item.hasClass('finish')) {
      // item.appendTo($('.check-list')).show('slow'); // => 刪除的 item 移到最下面
      item.find('input').prop('checked', true);
    } else {
      item.find('input').prop('checked', false);
    }
  });

  // $('.check-list').on('click', (e) => {
  //   if (e.target.tagName === 'INPUT') {
  //     const item = $(e.target).parent();
  //     const badge = item.find('.badge-state');

  //     item.toggleClass('finish');
  //     badge.toggleClass('badge-info').toggleClass('badge-warning');

  //     const str = item.hasClass('finish') ? '完成' : '未完成';
  //     badge.text(str);

  //     if (item.hasClass('finish')) {
  //       item.appendTo($('.check-list')); // => 刪除的 item 移到最下面
  //     }
  //   }
  // });
});
