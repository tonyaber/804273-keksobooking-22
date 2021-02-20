const setPriceAndTime = () => {
  const form = document.querySelector('.ad-form');
  const typeInput = form.querySelector('#type');
  const timeInInput = form.querySelector('#timein');
  const timeOutInput = form.querySelector('#timeout');
  const priceInput = form.querySelector('#price');

  const typeArray = ['bungalow', 'flat', 'house', 'palace'];
  const priceArray = [0, 1000, 5000, 10000];

  //установление минимума по умолчанию
  priceInput.setAttribute('min', priceArray[1]);

  //изменение минимума при выборе типа жилья
  typeInput.addEventListener('input', () => {
    const index = typeArray.findIndex((value) => {
      return value === typeInput.value;
    });

    priceInput.setAttribute('min', priceArray[index]);
    priceInput.setAttribute('placeholder', priceArray[index]);

  });

  //зависимость времени заезда/выезда
  timeInInput.addEventListener('change', () => {
    timeOutInput.value = timeInInput.value;
  });

  timeOutInput.addEventListener('change', () => {
    timeInInput.value = timeOutInput.value;
  });
}

export { setPriceAndTime };
