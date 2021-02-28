import { map } from './main.js';
import { createIcons } from './ad-map.js';
import { dataDownloadError, showAlertSuccess, showAlertError, resetForm } from './util.js';
import { form } from './setting-for-form.js';

fetch('https://22.javascript.pages.academy/keksobooking/data')
  .then((response) => response.json())
  .then((offers) => {
    createIcons(map, offers)
  })
  .catch(() => {
    dataDownloadError('Не удалось загрузить данные с сервера. Повторите ошибку позже');
  })

const checkStatus = (response) => {
  if (response.ok) {
    return response;
  }
  throw new Error();
}

const postData = (evt) => {
  evt.preventDefault();
  const formData = new FormData(evt.target);
  fetch(
    'https://22.javascript.pages.academy/keksobooking',
    {
      method: 'POST',
      body: formData,
    },
  )
    .then(checkStatus)
    .then(() => {
      showAlertSuccess();
      resetForm(form);
    })
    .catch(() => showAlertError())
}

//отправка формы
form.addEventListener('submit', postData);

//очистка формы
const resetButton = form.querySelector('.ad-form__reset');
resetButton.addEventListener('click', (evt) => {
  evt.preventDefault();
  resetForm(form);
  form.addEventListener('submit', postData);
})

