const form = document.querySelector('form');
const inputGroup = document.querySelectorAll('form .require');
console.log(inputGroup);
form.addEventListener('submit', (e) => {
  for (let i = 0; i < inputGroup.length; i += 1) {
    if (inputGroup[i].value === '') {
      e.preventDefault();
      alert('要先填完內容喔');
      break;
    }
  }
});
