/* eslint-disable prefer-destructuring */
document.querySelector('.comments').addEventListener('click', (e) => {
  let target = '';
  if (e.target.classList.contains('comments_item')) {
    target = e.target;
  } else if (e.target.nodeName !== 'A') {
    target = e.target.parentElement;
  }
  target.classList.toggle('show_input');
});
