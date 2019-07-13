/* eslint-disable camelcase */
/* eslint-disable func-names */
/* eslint-disable no-undef */
$(document).ready(() => {
  // error Msg
  function error() {
    console.log('失敗');
  }

  // CRUD callback
  class Msg {
    constructor(id, target) {
      this.id = id;
      this.btn = target;
      this.comment = target.parent();
    }

    delete() {
      if (window.location.pathname.indexOf('index') > 0) { // => 前台，直接移除
        this.comment.fadeOut(('slow', () => this.btn.remove()));
      } else {
        this.comment.addClass('theme-deleted');
        this.btn.replaceWith(`
          <a class='btn btn_1 btn_recovery' data-id=${this.id}>還原</a>
          <a class='btn btn_1 btn_clean' data-id=${this.id}>永久清除</a>
        `);
      }
    }

    clean() {
      this.comment.fadeOut(('slow', () => this.btn.remove()));
    }

    recovery() {
      this.comment.removeClass('theme-deleted').find('.btn_clean').remove();
      this.btn.replaceWith(`<a class='btn btn_1 btn_delete' data-id=${this.id}>刪除</a>`);
    }

    update(content) {
      const btn = this.comment.parent().find('.isEditing');
      this.comment.replaceWith(`<p class='comments__content'>${content}</p>`);
      btn.text('編輯').removeClass('isEditing');
    }

    post(res, layer) {
      const resp = JSON.parse(res);
      console.log(resp);
      const newMsg = `
      <div class="comments_item" data-id=${resp.comment_id}>
          <p class="comments__username">${resp.nickname}</p>
          <time class="comments__time">${resp.created_at}</time>
          <p class="comments__content">${resp.content}</p>
          <a class="comments__like" href="./handling/handle_add_like.php?comment_id=${resp.comment_id}">0</a>
          <a class='btn btn_1 btn_edit' data-id='${resp.comment_id}' data-user='${resp.user_id}'>編輯</a>
          <a class='btn btn_1 btn_delete' data-id='${resp.comment_id}'>刪除</a>
          <section class='comment__inside '>
            <form action="./handling/handle_post_comment.php" method="POST" class="show_input">
              <textarea class="comment__input comment__input-inside" name="content" rows="2" placeholder="回應 ${resp.nickname}" required=""></textarea>
              <a class="btn btn_1 btn_post" data-layer='${layer + 1}' data-parent='${resp.comment_id}'>送出</a>
            </form>
          </section>
      </div>
      `;

      if (resp.layer === 1) { // => 第一層主留言
        $(newMsg).hide().prependTo('.comments').fadeIn(1000);
        $('.add-comment textarea').val('');
      } else { // => 子留言
        const parent = $('.comments').find(`.comments_item[data-id=${resp.parent_id}]`);
        $(newMsg).addClass('comments_child')
          .hide()
          .insertBefore(parent.find('.comments_item'))
          .fadeIn(1000); // => 插入在所有子留言的第一個
        this.comment.find('textarea').val('');
      }
    }
  }

  // 按下編輯按鈕
  $('.comments, .add-comment').on('click', '.btn', function (e) {
    e.preventDefault();
    const target = $(this);
    const item = target.parent();
    let id = item.data('id');


    function sendReq(type, content = '', layer = '', parent_id = '') {
      // Ajax 參數
      req = {
        delete:
          [
            'GET', `./handling/handle_delete_comment.php?comment_id=${id}`,
            () => {
              msg = new Msg(id, target);
              msg.delete();
            },
          ],
        clean:
          [
            'GET', `./handling/handle_clean_comment.php?comment_id=${id}`,
            () => {
              msg = new Msg(id, target);
              msg.clean();
            },
          ],
        recovery:
          [
            'GET', `./handling/handle_recovery_comment.php?comment_id=${id}`,
            () => {
              msg = new Msg(id, target);
              msg.recovery();
            },
          ],
        update:
          [
            'POST', './handling/handle_update_comment.php',
            () => {
              msg = new Msg(id, target);
              msg.update(content);
            },
            {
              id,
              content,
            },
          ],
        post:
          [
            'POST', './handling/handle_post_comment.php',
            (res) => {
              console.log(res);
              msg = new Msg(id, target);
              msg.post(res, layer);
            },
            {
              content,
              parent_id,
              layer,
            },
          ],
      };

      $.ajax({
        type: req[type][0],
        url: req[type][1],
        data: req[type][3] || '',
        success: req[type][2],
        error,
      });
    }

    (function MsgControl() {
      let content = '';
      const clickBtn = className => target.hasClass(className);

      switch (true) {
        case clickBtn('btn_delete'):
          sendReq('delete'); break;

        case clickBtn('btn_clean'):
          sendReq('clean'); break;

        case clickBtn('btn_recovery'):
          sendReq('recovery'); break;

        case clickBtn('btn_update'):
          id = item.parent().data('id');
          content = item.find('textarea').val();
          sendReq('update', content);
          break;

        case clickBtn('btn_post'):
          content = item.find('textarea').val();
          layer = target.data('layer');
          parent_id = target.data('parent');
          sendReq('post', content, layer, parent_id);
          break;
        default: break;
      }
    }());
  });
});
