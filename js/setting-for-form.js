import { changeSelected } from './util.js';
import { roomToCapacity, capacityArray, typeToPrice, LocationTokio } from './data.js';

//функция блокировки елементов
const disableOption = (parent) => {
  const child = parent.querySelectorAll('option');
  for (let i = 0; i < child.length; i++) {
    child[i].disabled = true;
  }
}

//функция разблокировки елементов
const enableOption = (array, parent) => {
  const child = parent.querySelectorAll('option');
  array.forEach( item => {
    child[item].disabled = false;
  })
}

//опции формы
const formConfig = {
  METHOD: 'POST',
  ACTION: 'https://22.javascript.pages.academy/keksobooking',
  ENCTYPE: 'multipart/form-data',
  ACCEPT: 'image/*',
  MIN_LENGTH: 30,
  MAX_LENGTH: 100,
  MAX_PRICE: 1000000,
}

//елементы формы
const form = document.querySelector('.ad-form');
const typeInput = form.querySelector('#type');
const timeInput = form.querySelector('.ad-form__element--time');
const timeIn = timeInput.querySelector('#timein');
const timeOut = timeInput.querySelector('#timeout');
const priceInput = form.querySelector('#price');
const roomNumber = form.querySelector('#room_number');
const capacity = form.querySelector('#capacity');
const capacityOption = capacity.querySelectorAll('option');
const address = form.querySelector('#address');
const submitButton = form.querySelector('.ad-form__submit');


//функция, что записывает адрес поля в форму
const addAddress = (location) => {
  address.setAttribute('readonly', 'readonly');
  address.value = `${location.X}, ${location.Y}`;
}

//поля формы по умолчанию
const defaultForm = () => {
  addAddress(LocationTokio);
  typeInput[1].setAttribute('selected', '');
  priceInput.setAttribute('min', typeToPrice['flat']);
  priceInput.setAttribute('placeholder', typeToPrice['flat']);
  roomNumber[0].setAttribute('selected', '');
  timeIn[0].setAttribute('selected', '');
  timeOut[0].setAttribute('selected', '');

  //по умолчанию для 1 гостя одна комата
  changeSelected(capacity, 2);
  disableOption(capacity);
  enableOption(roomToCapacity[1], capacity);
}

//настройка формы
const settingForForm = () => {
  defaultForm();

  //изменение минимума при выборе типа жилья
  typeInput.addEventListener('input', (evt) => {
    const index = evt.target.options.selectedIndex;
    const value = evt.target.value;
    changeSelected(evt.target, index);
    priceInput.min = typeToPrice[value];
    priceInput.placeholder = typeToPrice[value];
  });

  //слушатель событий для времени,
  //ставит селект в выбраное поле,
  //устанавливает зависимость времени въезда/выезда
  timeInput.addEventListener('change', (evt) => {
    const index = evt.target.options.selectedIndex;
    const value = evt.target.value;
    changeSelected(timeIn, index);
    changeSelected(timeOut, index);
    timeOut.value = value;
    timeIn.value = value;
  });

  //атрибуты формы
  form.setAttribute('method', formConfig.METHOD);
  form.setAttribute('action', formConfig.ACTION);
  form.setAttribute('enctype', formConfig.ENCTYPE);

  //атрибуты елементов формы
  const avatar = form.querySelector('#avatar');
  avatar.setAttribute('required', '');
  avatar.setAttribute('accept', formConfig.ACCEPT);

  const title = form.querySelector('#title');
  title.setAttribute('required', '');
  title.setAttribute('minlength', formConfig.MIN_LENGTH);
  title.setAttribute('maxlength', formConfig.MAX_LENGTH);

  const price = form.querySelector('#price');
  price.setAttribute('required', '');
  price.setAttribute('max', formConfig.MAX_PRICE);

  const images = form.querySelector('#images');
  images.setAttribute('required', '');
  images.setAttribute('accept', formConfig.ACCEPT);


  //слушатель событий для количества гостей,
  //устанавливает селект на нужное поле,
  //блокирует запрещенные варианты количества комнат
  roomNumber.addEventListener('input', (evt) => {
    const index = evt.target.options.selectedIndex;
    const value = evt.target.value;
    changeSelected(evt.target, index);
    disableOption(capacity);
    enableOption(roomToCapacity[value], capacity);
    changeSelected(capacity, roomToCapacity[value][0]);
  });

  //слушатель событий для поля количества комнат,
  //устанавливает селект на выбранное поле
  capacity.addEventListener('input', (evt) => {
    const index = evt.target.options.selectedIndex;
    changeSelected(evt.target, index);
  });

  //проверка при отправке формы, правильно ли указано количество комнат
  const submitForm = () => {
    const index = capacityArray.findIndex((value) => {
      return value == capacity.value;
    });

    if (capacityOption[index].disabled == true) {
      capacity.setCustomValidity('Измените колиство комнат');
    } else if (capacityOption[index].disabled == false) {
      capacity.setCustomValidity('');
    }
  }
  submitButton.addEventListener('click', submitForm);
}

export { settingForForm, defaultForm, addAddress, form, submitButton };
