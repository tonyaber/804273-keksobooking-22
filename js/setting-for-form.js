import { changeSelected, findIndexInArray } from './set-price-and-time.js'
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
  const roomNumberArray = [1, 2, 3, 100];
  const capacityArray = [3, 2, 1, 0];

  //по умолчанию для 1 гостя одна комата, блокируем возможность
  //отправки формы, если пользователь не поменял значения
  changeSelected(capacity, 2);
  capacityOption[0].disabled = true;
  capacityOption[1].disabled = true;
  capacityOption[3].disabled = true;

  //слушатель событий для количества гостей,
  //устанавливает селект на нужное поле,
  //блокирует запрещенные варианты количества комнат
  roomNumber.addEventListener('input', () => {
    const index = findIndexInArray(roomNumber, roomNumberArray);
    changeSelected(roomNumber, index);

    if (roomNumber.value == 1) {

      capacityOption[0].disabled = true;
      capacityOption[1].disabled = true;
      capacityOption[2].disabled = false;
      capacityOption[3].disabled = true;
      changeSelected(capacity, 2);
    }
    else if (roomNumber.value == 2) {
      capacityOption[0].disabled = true;
      capacityOption[1].disabled = false;
      capacityOption[2].disabled = false;
      capacityOption[3].disabled = true;
      changeSelected(capacity, 1);

    }
    else if (roomNumber.value == 3) {
      capacityOption[0].disabled = false;
      capacityOption[1].disabled = false;
      capacityOption[2].disabled = false;
      capacityOption[3].disabled = true;
      changeSelected(capacity, 0);
    }
    else if (roomNumber.value == 100) {
      capacityOption[0].disabled = true;
      capacityOption[1].disabled = true;
      capacityOption[2].disabled = true;
      capacityOption[3].disabled = false;
      changeSelected(capacity, 3);
    }
  });

  //слушатель событий для поля количества комнат,
  //устанавливает селект на выбранное поле
  capacity.addEventListener('input', () => {
    const index = findIndexInArray(capacity, capacityArray);
    changeSelected(capacity, index);
  })

}



export { settingForForm };
