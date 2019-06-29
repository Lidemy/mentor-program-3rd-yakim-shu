let isEditing = false;
let content = '';

window.addEventListener('click', (e) => {
  if (!e.target.classList.contains('btn_edit')) return;
  e.preventDefault();

  const btn = e.target;
  const testArea = btn.parentNode.children[2];
  if (testArea.nodeName === 'P') content = testArea.innerText; // => 先儲存原訊息

  const formHTML = `
  <form action="handle_update_comment.php" method="POST">
    <textarea class="edit require comment__input" name="content" id="" rows="2" required>${content}</textarea>
    <input style="display:none" name="comment_id" value="${btn.dataset.id}">
    <button class="add-comment__submit" type="submit">更新</button>
  </form>
  `;

  if (isEditing) {
    isEditing = false;
    btn.innerText = '編輯';
    testArea.outerHTML = `<p class='comments__content'>${content}</p>`;
  } else {
    isEditing = true;
    btn.innerText = '取消編輯';
    testArea.outerHTML = formHTML; // => 改成 textarea
  }
});
