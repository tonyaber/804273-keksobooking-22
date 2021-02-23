import { changeSelected} from './set-price-and-time.js'
import { roomToCapacity, capacityArray } from './mock.js';
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
  array.forEach(function (item) {
    child[item].disabled = false;
  });
}

const settingForForm = () => {
  const form = document.querySelector('.ad-form');

  //атрибуты формы
  form.setAttribute('method', 'POST');
  form.setAttribute('action', 'https://22.javascript.pages.academy/keksobooking');
  form.setAttribute('enctype', 'multipart/form-data');

  //атрибуты елементов формы
  const avatar = form.querySelector('#avatar');
  avatar.setAttribute('required', '');
  avatar.setAttribute('accept', 'image/*');

  const title = form.querySelector('#title');
  title.setAttribute('required', '');
  title.setAttribute('minlength', 30);
  title.setAttribute('maxlength', 100);

  const price = form.querySelector('#price');
  price.setAttribute('required', '');
  price.setAttribute('max', 1000000);

  const images = form.querySelector('#images');
  images.setAttribute('required', '');
  images.setAttribute('accept', 'image/*');

  //елементы количества мест и комнат
  const roomNumber = form.querySelector('#room_number');
  const capacity = form.querySelector('#capacity');
  const capacityOption = capacity.querySelectorAll('option');

  //по умолчанию для 1 гостя одна комата
  changeSelected(capacity, 2);
  disableOption(capacity);
  enableOption(roomToCapacity[1], capacity);

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
  const button = form.querySelector('.ad-form__submit');

  const submitForm = () => {
    const index = capacityArray.findIndex((value) => {
      return value == capacity.value;
    });

    if (capacityOption[index].disabled == true) {
      capacity.setCustomValidity('Измените колиство комнат');
    }
    else if (capacityOption[index].disabled == false) {
      capacity.setCustomValidity('');
    }
  }

  button.addEventListener('click', () => {
    submitForm();
  });

}
export { settingForForm };
