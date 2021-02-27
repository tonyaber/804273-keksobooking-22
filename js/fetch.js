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

let sucsess = false;

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
    .then((response) => {
      if (response.ok) {
        showAlertSuccess();
        resetForm(form);
        sucsess = true;
      }
      else {
        showAlertError();
        sucsess = false;
      }
    })
    .catch(() => {
      showAlertError();
    })
}
form.addEventListener('submit', postData)
export {sucsess}
