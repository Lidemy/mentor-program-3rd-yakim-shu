/* eslint-disable prefer-arrow-callback */
/* eslint-disable camelcase */
/* eslint-disable func-names */
/* eslint-disable no-undef */
$(document).ready(() => {
  // 留言 ajax callback
  class Msg {
    constructor(id, btn) {
      this.id = id;
      this.btn = btn;
      this.comment = btn.parent();
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

      // .find() => 找所有子元素
      // .child() => 找下一層級子元素
      const parent = $('.comments').find(`.comments_item[data-id=${resp.parent_id}]`);
      const isOrgin = (parent.children('.comments__username').text() === resp.nickname) ? 'default' : '';

      const newMsg = `
      <div class="comments_item comments_child" data-id=${resp.comment_id}>
          <p class="comments__username ${isOrgin}">${resp.nickname}</p>
          <time class="comments__time">${resp.created_at}</time>
          <p class="comments__content">${resp.content}</p>
          <a class="comments__like btn btn_add_like">0</a>
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

      // 主留言
      if (resp.layer === 1) {
        $(newMsg).removeClass('comments_child')
          .hide()
          .prependTo('.comments')
          .fadeIn(1000);
        $('.add-comment textarea').val('');
      // 子留言 ------
      } else {
        this.comment.find('textarea').val('');
        $(newMsg).hide();

        // => 第 n 個子留言，用相對位置
        if (parent.children('.comments_item').length) {
          $(newMsg)
            .insertBefore(parent.children('.comments_item')[0]) // => 插入在第一個子留言之前
            .fadeIn(1000);

        // => 第 1 個子留言，用絕對位置
        } else {
          $(newMsg)
            .appendTo(parent)
            .fadeIn(1000);
        }
      }
    }
  }

  // 按讚 ajax callback
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

  // 頁面按鈕控制
  $('.comments, .add-comment').on('click', '.btn', function (e) {
    e.preventDefault();
    const target = $(e.target);
    const comment = target.parent();
    let id = comment.data('id');


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
              msg = new Msg(id, target);
              msg.post(res, layer);
            },
            {
              content,
              parent_id,
              layer,
            },
          ],
        add_like:
          [
            'GET', `./handling/handle_add_like.php?comment_id=${id}`,
            () => {
              like = new Like(id, target);
              like.add();
            },
          ],
        remove_like:
          [
            'GET', `./handling/handle_remove_like.php?comment_id=${id}`,
            () => {
              like = new Like(id, target);
              like.remove();
            },
          ],
      };

      // Ajax 操作
      $.ajax({
        type: req[type][0],
        url: req[type][1],
        data: req[type][3] || '',
      })
        .done(function (data) {
          req[type][2](data);
        })
        .fail(function (jqXHR, textStatus) {
          console.log('失敗: ', textStatus);
        });
    }

    // 不同按鈕要進行的操作
    (function btnControl() {
      let content = '';
      const clickBtn = className => target.hasClass(className);

      switch (true) {
        case clickBtn('btn_delete'): // => 刪除
          sendReq('delete'); break;

        case clickBtn('btn_clean'): // => 永久清除
          sendReq('clean'); break;

        case clickBtn('btn_recovery'): // => 還原
          sendReq('recovery'); break;

        case clickBtn('btn_update'): // => 更新
          id = comment.parent().data('id');
          content = comment.find('textarea').val();
          sendReq('update', content);
          break;

        case clickBtn('btn_post'): // => 新增
          content = comment.find('textarea').val();
          layer = target.data('layer');
          parent_id = target.data('parent');
          sendReq('post', content, layer, parent_id);
          break;

        case clickBtn('btn_add_like'): // => (like) 按讚
          sendReq('add_like');
          break;

        case clickBtn('btn_remove_like'): // => (like) 移除讚
          sendReq('remove_like');
          break;

        default: break;
      }
    }());
  });
});
