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

  //ззависимость поле выбора количества мест от формы с количеством комнат
  const roomNumber = form.querySelector('#room_number');
  const capacity = form.querySelector('#capacity');
  const capacityOption = capacity.querySelectorAll('option');

  //по умолчанию для 1 гостя одна комата, блокируем возможность
  //отправки формы, если пользователь не поменял значения
  capacityOption[2].setAttribute('selected', '');
  capacityOption[0].setAttribute('disabled', 'disabled');
  capacityOption[1].setAttribute('disabled', 'disabled');
  capacityOption[3].setAttribute('disabled', 'disabled');

  //слушатель событий
  roomNumber.addEventListener('input', () => {
    if (roomNumber.value == 1) {
      capacityOption[0].setAttribute('disabled', 'disabled');
      capacityOption[1].setAttribute('disabled', 'disabled');
      capacityOption[2].removeAttribute('disabled', 'disabled');
      capacityOption[3].setAttribute('disabled', 'disabled');
    }
    else if (roomNumber.value == 2) {
      capacityOption[0].setAttribute('disabled', 'disabled');
      capacityOption[1].removeAttribute('disabled', 'disabled');
      capacityOption[2].removeAttribute('disabled', 'disabled');
      capacityOption[3].setAttribute('disabled', 'disabled');
    }
    else if (roomNumber.value == 3) {
      capacityOption[0].removeAttribute('disabled', 'disabled');
      capacityOption[1].removeAttribute('disabled', 'disabled');
      capacityOption[2].removeAttribute('disabled', 'disabled');
      capacityOption[3].setAttribute('disabled', 'disabled');
    }
    else if (roomNumber.value == 100) {
      capacityOption[0].setAttribute('disabled', 'disabled');
      capacityOption[1].setAttribute('disabled', 'disabled');
      capacityOption[2].setAttribute('disabled', 'disabled');
      capacityOption[3].removeAttribute('disabled', 'disabled');
    }
  });
}
export { settingForForm };
