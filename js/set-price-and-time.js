import { TypeToPrice } from './mock.js';

//функция переносит селект на тот элемент, который выбран
const changeSelected = (parent, index) => {
  const child = parent.querySelectorAll('option');
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

  //установление минимума по умолчанию
  priceInput.min =TypeToPrice['flat'];

  //изменение минимума при выборе типа жилья
  typeInput.addEventListener('input', (evt) => {
    const index = evt.target.options.selectedIndex;
    const value = evt.target.value;
    changeSelected(evt.target, index);
    priceInput.min = TypeToPrice[value];
    priceInput.placeholder = TypeToPrice[value];

  });

  //слушатель событий для времени,
  //ставит селект в выбраное поле,
  //устанавливает зависимость времени въезда/выезда
  timeInInput.addEventListener('change', (evt) => {
    const index = evt.target.options.selectedIndex;
    const value = evt.target.value;
    changeSelected(timeInInput, index);
    changeSelected(timeOutInput, index);
    timeOutInput.value = value;
  });

  timeOutInput.addEventListener('change', (evt) => {
    const index = evt.target.options.selectedIndex;
    const value = evt.target.value;
    changeSelected(timeInInput, index);
    changeSelected(timeOutInput, index);
    timeInInput.value = value;
  });
}

export { setPriceAndTime, changeSelected };
