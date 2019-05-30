function eventListener() {
  console.log('load');
  const form = document.querySelector('.form');
  form.addEventListener('click', (e) => {
    const objectRead = document.querySelectorAll('input[read="true"]');
    if (e.target.getAttribute('required') === '' && e.target.value === '') {
      e.target.setAttribute('read', 'true');
    }
    if (objectRead.length > 0) {
      for (let i = 0; i < objectRead.length; i += 1) {
        if (objectRead[i].value === '') {
          e.target.setAttribute('read', 'true');
          objectRead[i].parentElement.classList.add('read');
        } else {
          objectRead[i].removeAttribute('read');
          objectRead[i].parentElement.classList.remove('read');
        }
      }
    }
  });
}


window.onload = eventListener;
