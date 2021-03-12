import { form } from './setting-for-form.js';
import { dataDownloadError, showAlertSuccess, showAlertError, resetForm, defaultMap } from './util.js';
import { URL_GET, URL_POST } from './const.js';

const getData = (onSuccess) => {
  fetch(URL_GET)
    .then((response) => response.json())
    .then((offers) => onSuccess(offers))
    .catch(() => dataDownloadError('Не удалось загрузить данные с сервера. Повторите попытку позже'))
};

const checkStatus = (response) => {
  if (response.ok) {
    return response;
  }
  throw new Error();
};

const sendData = (evt) => {
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
    .catch(() => showAlertError());
};

//отправка формы
form.addEventListener('submit', sendData);

export { getData };
