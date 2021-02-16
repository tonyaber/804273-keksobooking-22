const typeInput = document.querySelector('#type');
const priceInput = document.querySelector('#price');
const timeInInput = document.querySelector('#timein');
const timeOutInput = document.querySelector('#timeout');

const typeArray = ['bungalow', 'flat', 'house', 'palace'];
const priceArray = [0, 1000, 5000, 10000];

typeInput.addEventListener('change', () => {
  const index = typeArray.findIndex((value) => {
    return value === typeInput.value;
  });
  priceInput.min = priceArray[index];
  priceInput.placeholder = priceArray[index];
});

timeInInput.addEventListener('change', () => {
  timeOutInput.value = timeInInput.value;
});

timeOutInput.addEventListener('change', () => {
  timeInInput.value = timeOutInput.value;
});
