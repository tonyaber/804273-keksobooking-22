//Функция поиска рандомного числа
const getRandomNumber = (min, max, numberOfDigits = 0) => {
  if (max >= 0 && min >= 0) {

    return (Math.random() * (max - min) + min).toFixed(numberOfDigits);
  }

  throw new Error('Число меньше нуля');
}

//Функция создания массива с рандомным набором данных
const getRandomArray = (array) => {
  const newArray = array.slice();

  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const swap = newArray[j];
    newArray[j] = newArray[i];
    newArray[i] = swap;
  }

  const count = getRandomNumber(1, newArray.length - 1);
  return newArray.slice(0, count);
}

export {  getRandomNumber, getRandomArray };
