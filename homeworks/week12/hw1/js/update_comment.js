const comments = {}; // => 編輯過的留言

window.addEventListener('click', (e) => {
  if (!e.target.classList.contains('btn_edit')) return;

  e.preventDefault();
  const btn = e.target;
  const { id } = btn.dataset;
  const { user } = btn.dataset;
  const textNode = btn.parentNode.children[2];

  if (textNode.nodeName === 'P') comments[id] = textNode.innerText; // => 先儲存原訊息

  /*
    JS 跳脫
    from: https://stackoverflow.com/questions/1787322/htmlspecialchars-equivalent-in-javascript/4835406#4835406
  */
  function escapeHtml(text) {
    const map = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#039;',
    };
    return text.replace(/[&<>"']/g, m => map[m]);
  }

  const formHTML = `
  <form action="handling/handle_update_comment.php" method="POST">
    <textarea class="edit require comment__input" name="content" id="" rows="2" required>${escapeHtml(comments[id])}</textarea>
    <input type='hidden' name='user_id' value='${user}'>
    <input type='hidden' name='id' value='${id}'>
    <button class="add-comment__submit" type="submit">更新</button>
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
