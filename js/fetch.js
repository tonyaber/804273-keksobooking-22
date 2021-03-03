import { form } from './setting-for-form.js';
import { dataDownloadError, showAlertSuccess, showAlertError, resetForm, defaultMap } from './util.js';
import { URL_GET, URL_POST } from './data.js';

const fetchGet = (onSuccess) => {
  fetch(URL_GET)
    .then((response) => response.json())
    .then((offers) => onSuccess(offers))
    .catch(() => dataDownloadError('Не удалось загрузить данные с сервера. Повторите попытку позже'))
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
    URL_POST,
    {
      method: 'POST',
      body: formData,
    },
  )
    .then(checkStatus)
    .then(() => {
      showAlertSuccess();
      resetForm(form);
      defaultMap();
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
  defaultMap();
})

export { fetchGet };
