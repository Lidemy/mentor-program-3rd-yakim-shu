/* eslint-disable prefer-arrow-callback */
/* eslint-disable camelcase */
/* eslint-disable func-names */
/* eslint-disable no-undef */

// 留言 DOM 操作
class Msg {
  constructor(id, btn) {
    this.id = id;
    this.btn = btn;
    this.comment = btn.parent();
  }

  delete() {
    if (window.location.pathname.indexOf('index') > 0) { // => 前台，直接移除
      this.comment.fadeOut(('slow', () => this.comment.remove()));
    } else {
      this.comment.addClass('theme-deleted');
      this.btn.replaceWith(`
          <a class='btn btn_1 btn_recovery'>還原</a>
          <a class='btn btn_1 btn_clean'>永久清除</a>
        `);
    }
  }

  clean() {
    this.comment.fadeOut(('slow', () => this.btn.remove()));
  }

  recovery() {
    this.comment.removeClass('theme-deleted').find('.btn_clean').remove();
    this.btn.replaceWith("<a class='btn btn_1 btn_delete'>刪除</a>");
  }

  update(content) {
    const btn = this.comment.parent().find('.isEditing');
    this.comment.replaceWith(`<p class='comments__content'>${escapeHtml(content)}</p>`);
    btn.text('編輯').removeClass('isEditing');
  }

  post(resp, layer) {
    // .find() => 找所有子元素
    // .child() => 找下一層級子元素
    const parent = $('.comments').find(`.comments_item[data-id=${resp.parent_id}]`);
    const isOrgin = (parent.children('.comments__username').text() === resp.nickname) ? 'default' : '';

    const newMsg = `
      <div class="comments_item comments_child" data-id=${resp.comment_id}>
          <p class="comments__username ${isOrgin}">${escapeHtml(resp.nickname)}</p>
          <time class="comments__time">${resp.created_at}</time>
          <p class="comments__content">${escapeHtml(resp.content)}</p>
          <a class="comments__like btn btn_add_like">0</a>
          <a class='btn btn_1 btn_edit'>編輯</a>
          <a class='btn btn_1 btn_delete'>刪除</a>
          <section class='comment__inside '>
            <form action="./handling/handle_post_comment.php" method="POST" class="show_input">
              <textarea class="comment__input comment__input-inside" name="content" rows="2" placeholder="回應 ${escapeHtml(resp.nickname)}" required=""></textarea>
              <a class="btn btn_1 btn_post" data-layer='${layer + 1}' data-parent='${resp.comment_id}'>送出</a>
            </form>
          </section>
      </div>
      `;

    // 主留言
    if (resp.layer === 1) {
      $(newMsg).removeClass('comments_child')
        .hide()
        .prependTo('.comments')
        .fadeIn(1000);
      $('.add-comment textarea').val('');

      // 子留言 ------
    } else {
      parent.removeClass('show_input');
      this.comment.find('textarea').val('');

      // => 第 n 個子留言，相對位置
      if (parent.children('.comments_item').length) {
        $(newMsg)
          .hide()
          .insertBefore(parent.children('.comments_item')[0]) // => 插入在第一個子留言之前
          .fadeIn(1000);

        // => 第 1 個子留言，絕對位置
      } else {
        $(newMsg)
          .hide()
          .appendTo(parent)
          .fadeIn(1000);
      }
    }
  }
}

// 按讚 DOM 操作
class Like extends Msg {
  constructor(id, btn) {
    super(id, btn);
    this.init();
  }

  init() {
    this.btn.toggleClass('btn_remove_like btn_add_like liked');
  }

  add() {
    this.btn.text(parseInt(this.btn.text(), 10) + 1);
  }

  remove() {
    this.btn.text(parseInt(this.btn.text(), 10) - 1);
  }
}

// 提示訊息
function prompt(promtMsg, type) {
  $(`<span class='prompt ${type}'>${promtMsg}</span>`)
    .appendTo('.container').hide().fadeIn(400)
    .addClass('up')
    .delay(100)
    .fadeOut(800);
}


// Ajax
function sendReq(req) {
  $.ajax({
    type: req.method,
    url: req.url,
    data: req.data || {},
  })
    .done(function (res = {}, textStatus, jqXHR) {
      console.log(jqXHR.status, jqXHR.statusText);
      data = JSON.parse(res);

      if (data.result !== 'fail') {
        req.success(data.result);
        prompt(data.message, 'success');
      } else {
        prompt(data.message, 'error');
      }
    })
    .fail(function (jqXHR) {
      console.log(jqXHR.status);
      prompt(JSON.parse(jqXHR.responseText).message, 'error');
    });
}

// 不同按鈕要進行的操作
$(document).ready(() => {
  $('.comments, .add-comment').on('click', '.btn', function (e) {
    e.preventDefault();
    const target = $(e.target);
    const comment = target.parent();
    let id = comment.data('id');

    const clickBtn = className => target.hasClass(className);

    // => 刪除
    if (clickBtn('btn_delete')) {
      sendReq({
        method: 'GET',
        url: `./handling/handle_delete_comment.php?comment_id=${id}`,
        success: () => {
          msg = new Msg(id, target);
          msg.delete();
        },
      });
    }

    // => 永久刪除
    if (clickBtn('btn_clean')) {
      sendReq({
        method: 'GET',
        url: `./handling/handle_clean_comment.php?comment_id=${id}`,
        success: () => {
          msg = new Msg(id, target);
          msg.clean();
        },
      });
    }

    // => 還原
    if (clickBtn('btn_recovery')) {
      sendReq({
        method: 'GET',
        url: `./handling/handle_recovery_comment.php?comment_id=${id}`,
        success: () => {
          msg = new Msg(id, target);
          msg.recovery();
        },
      });
    }

    // => 更新
    if (clickBtn('btn_update')) {
      id = comment.parent().data('id');
      const content = comment.find('textarea').val();
      sendReq({
        method: 'POST',
        url: './handling/handle_update_comment.php',
        data: {
          id,
          content,
        },
        success: () => {
          msg = new Msg(id, target);
          msg.update(content);
        },
      });
    }

    // => 新增
    if (clickBtn('btn_post')) {
      const content = comment.find('textarea').val();
      layer = target.data('layer');
      parent_id = target.data('parent');

      sendReq({
        method: 'POST',
        url: './handling/handle_post_comment.php',
        data: {
          content,
          parent_id,
          layer,
        },
        success: (res) => {
          msg = new Msg(id, target);
          msg.post(res, layer);
        },
      });
    }

    // => (like) 按讚
    if (clickBtn('btn_add_like')) {
      sendReq({
        method: 'GET',
        url: `./handling/handle_add_like.php?comment_id=${id}`,
        success: () => {
          like = new Like(id, target);
          like.add();
        },
      });
    }

    // => (like) 移除讚
    if (clickBtn('btn_remove_like')) {
      sendReq({
        method: 'GET',
        url: `./handling/handle_remove_like.php?comment_id=${id}`,
        success: () => {
          like = new Like(id, target);
          like.remove();
        },
      });
    }
  });
});
