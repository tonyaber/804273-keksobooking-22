//функция поиска индекса выбранного элемента
const findIndexInArray = (element, array) => {
  return array.findIndex((value) => {
    return value == element.value;
  });
}

//функция переносит селект на тот элемент, который выбран
const changeSelected = (parent, index) => {
  const child = parent.querySelectorAll('option')
  for (let i = 0; i < child.length; i++) {
    child[i].removeAttribute('selected', '');
  }

  child[index].setAttribute('selected', '');
}
//смена времени и цены в зависимости от выбранных опций
const setPriceAndTime = () => {
  const form = document.querySelector('.ad-form');
  const typeInput = form.querySelector('#type');
  const timeInInput = form.querySelector('#timein');
  const timeOutInput = form.querySelector('#timeout');
  const priceInput = form.querySelector('#price');

  const typeArray = ['bungalow', 'flat', 'house', 'palace'];
  const priceArray = [0, 1000, 5000, 10000];
  const timeArray = ['12:00', '13:00', '14:00'];

  //установление минимума по умолчанию
  priceInput.min = priceArray[1];

  //изменение минимума при выборе типа жилья
  typeInput.addEventListener('input', () => {
    const index = findIndexInArray(typeInput, typeArray);
    changeSelected(typeInput, index);
    priceInput.min = priceArray[index];
    priceInput.placeholder = priceArray[index];

  });

  //слушатель событий для времени,
  //ставит селект в выбраное поле,
  //устанавливает зависимость времени въезда/выезда
  timeInInput.addEventListener('change', () => {

    const index = findIndexInArray(timeInInput, timeArray);
    changeSelected(timeInInput, index);
    changeSelected(timeOutInput, index);
    timeOutInput.value = timeInInput.value;
  });

  timeOutInput.addEventListener('change', () => {
    const index = findIndexInArray(timeOutInput, timeArray);
    changeSelected(timeInInput, index);
    changeSelected(timeOutInput, index);
    timeInInput.value = timeOutInput.value;
  });
}

export { setPriceAndTime, changeSelected, findIndexInArray };
