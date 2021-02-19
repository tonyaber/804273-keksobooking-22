const setPriceAndTime = () => {
  const form = document.querySelector('.ad-form');
  const typeInput = form.querySelector('#type');
  const timeInInput = form.querySelector('#timein');
  const timeOutInput = form.querySelector('#timeout');

  const typeArray = ['bungalow', 'flat', 'house', 'palace'];
  const priceArray = [0, 1000, 5000, 10000];

  typeInput.addEventListener('change', () => {
    const index = typeArray.findIndex((value) => {
      return value === typeInput.value;
    });
    const priceInput = form.querySelector('#price');
    priceInput.min = priceArray[index];
    priceInput.placeholder = priceArray[index];
  });

  timeInInput.addEventListener('change', () => {
    timeOutInput.value = timeInInput.value;
  });

  timeOutInput.addEventListener('change', () => {
    timeInInput.value = timeOutInput.value;
  });
}

export { setPriceAndTime };
