/* eslint-disable no-undef */
const comments = {}; // => 編輯過的留言

window.addEventListener('click', (e) => {
  if (!e.target.classList.contains('btn_edit')) return;

  e.preventDefault();
  const btn = e.target;
  const { id } = btn.parentNode.dataset;
  const textNode = btn.parentNode.children[2];

  if (textNode.nodeName === 'P') comments[id] = textNode.innerText; // => 先儲存原訊息

  const formHTML = `
  <form action="handling/handle_update_comment.php" method="POST">
    <textarea class="edit require comment__input" name="content" id="" rows="2" required>${escapeHtml(comments[id])}</textarea>
    <a class="btn btn_1 btn_update add-comment__submit" data-id=${id}>更新</a>
  </form>
  `;

  if (btn.classList.contains('isEditing')) {
    btn.innerText = '編輯';
    textNode.outerHTML = `<p class='comments__content'>${escapeHtml(comments[id])}</p>`;
  } else {
    btn.innerText = '取消編輯';
    textNode.outerHTML = formHTML; // => 改成 textarea
  }
  btn.classList.toggle('isEditing');
});
