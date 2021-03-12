import { LocationTokio } from './const.js';
import { defaultForm } from './setting-for-form.js';
import { mainMarker, map } from './main.js';
import { resetFilters } from './filter-ads.js';

const ALERT_SHOW_TIME = 5000;

const BUTTON_ESCAPE = 'Escape';

const main = document.querySelector('main');

//сообщения при ошибке загрузки данных
const dataDownloadError = (message) => {
  const mapCanvas = document.querySelector('#map-canvas');

  const alertContainer = document.createElement('div');

  alertContainer.style.zIndex = 1000;
  alertContainer.style.position = 'absolute';
  alertContainer.style.right = '10px';
  alertContainer.style.top = '10px';
  alertContainer.style.color = 'white';
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.margin = '10px auto';
  alertContainer.style.fontSize = '12px';
  alertContainer.style.textAlign = 'right';
  alertContainer.style.backgroundColor = 'red';

  alertContainer.textContent = message;

  mapCanvas.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};

//сообщение при успешной отправке данных
const showAlertSuccess = () => {
  const template = document.querySelector('#success').content;
  const templatePopup = template.querySelector('.success');
  const message = templatePopup.cloneNode(true);

  message.style.zIndex = 1000;

  main.append(message);

  const onDocumentClickInSuccess = () => {
    message.remove();
    document.removeEventListener('click', onDocumentClickInSuccess);
    document.removeEventListener('keydown', onDocumentEscKeydownInSuccess);
  };

  const onDocumentEscKeydownInSuccess = (evt) => {
    if (evt.key === BUTTON_ESCAPE) {
      onDocumentClickInSuccess();
    }
  };

  document.addEventListener('click', onDocumentClickInSuccess);

  document.addEventListener('keydown', onDocumentEscKeydownInSuccess);
};

//сообщение об ошибке при отправке данных
const showAlertError = () => {
  const template = document.querySelector('#error').content;
  const templatePopup = template.querySelector('.error');
  const message = templatePopup.cloneNode(true);

  message.style.zIndex = 1000;

  main.append(message);

  const onDocumentClickInError = () => {
    message.remove();
    document.removeEventListener('click', onDocumentClickInError);
    document.removeEventListener('keydown', onDocumentEscKeydownInError);
  };

  const onDocumentEscKeydownInError = (evt) => {
    if (evt.key === BUTTON_ESCAPE) {
      onDocumentClickInError();
    }
  };

  document.addEventListener('click', onDocumentClickInError);

  document.addEventListener('keydown', onDocumentEscKeydownInError);
};

//карта по умолчанию
const defaultMap = () => {
  map.setView({
    lat: LocationTokio.X,
    lng: LocationTokio.Y,
  }, 10);
};

//функция переносит селект на тот элемент, который выбран
const changeSelected = (select, index) => {
  const option = select.querySelectorAll('option');
  for (let i = 0; i < option.length; i++) {
    option[i].removeAttribute('selected', '');
  }
  option[index].setAttribute('selected', '');
};

//очистить форму
const resetForm = (form) => {
  form.reset();
  const selects = form.querySelectorAll('option');

  for (let i = 0; i < selects.length; i++) {
    selects[i].removeAttribute('selected', '');
  }

  defaultForm();
  resetFilters();
  mainMarker.setLatLng([LocationTokio.X, LocationTokio.Y]).update();
}

export { dataDownloadError, showAlertSuccess, showAlertError, resetForm, defaultMap, changeSelected };
