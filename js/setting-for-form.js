import { changeSelected, findIndexInArray } from './set-price-and-time.js'
//функция блокировки елементов
const disableOption = (parent) => {
  const child = parent.querySelectorAll('option');
  for (let i = 0; i < child.length; i++){
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
  const roomNumberArray = [1, 2, 3, 100];
  const capacityArray = [3, 2, 1, 0];
  const roomToCapacity = {
    1: [2],
    2: [1, 2],
    3: [0, 1, 2],
    100: [3],
  };


  //по умолчанию для 1 гостя одна комата
  changeSelected(capacity, 2);
  disableOption(capacity);
  enableOption(roomToCapacity[1], capacity);

  //слушатель событий для количества гостей,
  //устанавливает селект на нужное поле,
  //блокирует запрещенные варианты количества комнат
  roomNumber.addEventListener('input', () => {
    const index = findIndexInArray(roomNumber, roomNumberArray);
    const value = roomNumber.value;
    changeSelected(roomNumber, index);
    disableOption(capacity);
    enableOption(roomToCapacity[value], capacity);
    changeSelected(capacity, roomToCapacity[value][0]);
  });

  //слушатель событий для поля количества комнат,
  //устанавливает селект на выбранное поле
  capacity.addEventListener('input', () => {
    const index = findIndexInArray(capacity, capacityArray);
    changeSelected(capacity, index);
  });

  //проверка при отправке формы, правильно ли указано количество комнат
  form.addEventListener('submit', (evt) => {
    const index = findIndexInArray(capacity, capacityArray);
    const capacityOption = capacity.querySelectorAll('option');
    if (capacityOption[index].disabled == true) {
      evt.preventDefault();
      capacity.setCustomValidity('Измените колиство комнат');
    }
  });
}
export { settingForForm };
