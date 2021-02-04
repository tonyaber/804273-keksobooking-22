//Функция поиска рандомного числа
const getRandomNumber = (min, max, numberOfDigits = 0) => {
  if (max >= 0 && min >= 0) {
    const numberOfSigns = 10 ** numberOfDigits;

    return Math.round((Math.random() * (max - min) + min) * numberOfSigns) / numberOfSigns;
  }

  throw new Error('Число меньше нуля');
}

//Создание массива случайной длины с перемешанными елементами
const randomArrayItems = (array) => {
  array.sort(() => Math.random() - 0.5);
  let count = getRandomNumber(1, array.length - 1);
  return array.slice(0, count);
}

//количество необходимых обьектов
let countOfOffer = 10;

//Массивы данных с сайта
let type = ['palace', 'flat', 'house', 'bungalow'];
let features = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
let photos = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

//Функция создания обьекта
const createOffer = () => {
  let locationX = getRandomNumber(35.65, 35.7, 5);
  let locationY = getRandomNumber(139.7, 139.8, 5);
  return {
    author: {
      avatar: 'img/avatars/user0' + getRandomNumber(1, 8) + '.png',
    },
    location: {
      x: locationX,
      y: locationY,
    },
    offer: {
      title: 'Великолепная квартира-студия в центре Токио',
      address: locationX + ', ' + locationY,
      price: getRandomNumber(10000, 50000),
      type: type[getRandomNumber(0, type.length - 1)],
      rooms: getRandomNumber(1, 3),
      guests: getRandomNumber(0, 2),
      checkin: getRandomNumber(12, 14) + ':00',
      checkout: getRandomNumber(12, 14) + ':00',
      features: randomArrayItems(features),
      description: 'Подходит как туристам, так и бизнесменам.Квартира полностью укомплектована и недавно отремонтирована.',
      photos: randomArrayItems(photos),
    },


  }
}

//Конструктор
let obj = new Array(countOfOffer).fill(null).map(() => createOffer());

console.log(obj);
