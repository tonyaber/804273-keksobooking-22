import { form } from './setting-for-form.js';
//import { map } from './main.js';
//import { createIcons } from './ad-map.js';
import { dataDownloadError, showAlertSuccess, showAlertError, resetForm } from './util.js';
import { urlGet, urlPost } from './data.js';

const fetchGet = (onSuccess) => {
  fetch(urlGet)
    .then((response) => response.json())
    .then((offers) => {
      onSuccess(offers);
    })
    .catch(() => {
      dataDownloadError('Не удалось загрузить данные с сервера. Повторите попытку позже');
    })
}

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
    urlPost,
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
})

export { fetchGet, urlPost };
