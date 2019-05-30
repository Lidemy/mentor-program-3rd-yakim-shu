function setInputBg(inputRead) {
  if (inputRead.length < 0) return;
  for (let i = 0; i < inputRead.length; i += 1) {
    if (inputRead[i].value === '') inputRead[i].parentElement.classList.add('read');
    else inputRead[i].parentElement.classList.remove('read');
  }
}

function windowLoad() {
  window.addEventListener('click', (e) => {
    const inputRead = document.querySelectorAll('input[data-isRead="true"]');
    if (e.target.hasAttribute('required') && e.target.value === '') {
      e.target.setAttribute('data-isRead', 'true');
    }
    setInputBg(inputRead);
  });
}

window.onload = windowLoad;
