const form = document.querySelector('form');

function setInputBg(inputRead) {
  if (inputRead.length < 1) return;
  for (let i = 0; i < inputRead.length; i += 1) {
    if (inputRead[i].value === '' || inputRead[i].getAttribute('type') === 'radio') inputRead[i].parentElement.classList.add('read');
    else inputRead[i].parentElement.classList.remove('read');
  }
}

function radioCheck(target) {
  if (target.getAttribute('type') === 'radio') {
    if (target.checked) return target;
    return 'empty';
  }
  return false;
}

function submitCheck(e) {
  let isRadioChecked = false;
  const inputEmptyArr = [];
  for (let i = 0; i < e.target.length; i += 1) {
    const isRadio = radioCheck(e.target[i]);
    if (!e.target[i].value && e.target[i].hasAttribute('required')) inputEmptyArr.push(e.target[i]);
    if (isRadio === 'empty') continue;
    else if (isRadio) isRadioChecked = true;
  }
  if (!isRadioChecked) inputEmptyArr.push(document.querySelectorAll('input[type="radio"]')[0]);
  return (inputEmptyArr.length > 0 || !isRadioChecked) ? inputEmptyArr : 'Success';
}

function submitSuccess(e) {
  for (let i = 0; i < e.target.length; i += 1) {
    const name = e.target[i].getAttribute('name');
    const isRadio = radioCheck(e.target[i]);
    if (isRadio === 'empty') continue;
    else if (isRadio) console.log(`${name} : ${e.target[i].id}`);
    else console.log(`${name} : ${e.target[i].value}`);
  }
  alert('已咻咻咻送出～ 🙆');
}

function submitFail(e) {
  setInputBg(submitCheck(e));
  alert('雖然很煩，但還是填完唷！ 🙅‍');
  e.preventDefault();
}

// click 事件
window.addEventListener('click', (e) => {
  const inputRead = document.querySelectorAll('input[data-isRead="true"]');
  if (e.target.hasAttribute('required') && e.target.value === '') {
    e.target.setAttribute('data-isRead', 'true');
  }
  setInputBg(inputRead);
  if (e.target.getAttribute('type') === 'radio') e.target.parentElement.classList.remove('read');
});

// 送出表單前驗證
form.addEventListener('submit', (e) => {
  if (submitCheck(e) === 'Success') submitSuccess(e);
  else submitFail(e);
});
