import { LocationTokio } from './data.js';
import { defaultForm } from './setting-for-form.js';
import { mainMarker, map } from './main.js';

const ALERT_SHOW_TIME = 5000;

const main = document.querySelector('main');

const BUTTON_ESCAPE = 'Escape';
//Функция поиска рандомного числа
const getRandomNumber = (min, max, numberOfDigits = 0) => {
  if (max >= 0 && min >= 0) {
    return (Math.random() * (max - min) + min).toFixed(numberOfDigits);
  }
  throw new Error('Число меньше нуля');
};

//Функция создания массива с рандомным набором данных
const getRandomArray = (array) => {
  const newArray = array.slice();

  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const swap = newArray[j];
    newArray[j] = newArray[i];
    newArray[i] = swap;
  }

  const count = getRandomNumber(1, newArray.length - 1);

  return newArray.slice(0, count);
};

//Функция создания рамдомного элемента в масиве
const getRandomElementOfArray = (array) => array[getRandomNumber(0, array.length - 1)];

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

  const onDocumentEscKeydownInSuccess = (evt) => {
    if (evt.key === BUTTON_ESCAPE) {
      onDocumentClickInSuccess();
    }
  };

  const onDocumentClickInSuccess = () => {
    message.remove();
    document.removeEventListener('click', onDocumentClickInSuccess);
    document.removeEventListener('keydown', onDocumentEscKeydownInSuccess);
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

  const onDocumentEscKeydownInError = (evt) => {
    if (evt.key === BUTTON_ESCAPE) {
      onDocumentClickInError();
    }
  };

  const onDocumentClickInError = () => {
    message.remove();
    document.removeEventListener('click', onDocumentClickInError);
    document.removeEventListener('keydown', onDocumentEscKeydownInError);
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

  mainMarker.setLatLng([LocationTokio.X, LocationTokio.Y]).update();
}

export { getRandomNumber, getRandomArray, getRandomElementOfArray, dataDownloadError, showAlertSuccess, showAlertError, resetForm, defaultMap, changeSelected };
