import { getRandomNumber, getRandomArray } from './util.js';

//количество необходимых обьектов
const COUNT_OF_OFFER = 10;

//Массивы  и перечисления
const Type = {
  PALACE: 'Дворец',
  FLAT: 'Квартира',
  HOUSE: 'Дом',
  BUNGALOW: 'Бунгало',
};

const Feature = {
  WIFI: 'Wi-Fi',
  DISHWASHER: 'Посудомоечная машина',
  PARKING: 'Парковка',
  WASHER: 'Стиральная машина',
  ELEVATOR: 'Лифт',
  CONDITIONER: 'Кондиционер',
};

const Price = {
  MIN: 10000,
  MAX: 50000,
};

const Photos = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

const Time = ['12:00', '13:00', '14:00'];

const Description = [
  'Подходит как туристам, так и бизнесменам. Квартира полностью укомплектована и недавно отремонтирована.',
  'Отличный вид на ночной город, находится в самом центре Токио.',
  'Тихий район, рядом парк и озеро. Отлиное место для отдыха и релакса.',
  'Рядом с самым большим торговым цетнтром Токио! Отличное место для тех, кто любит шопинг.',
];

const Location = {
  x: {
    MIN: 35.65,
    MAX: 35.7,
    NUMBER_OF_DIGITS: 5,
  },
  y: {
    MIN: 139.7,
    MAX: 139.8,
    NUMBER_OF_DIGITS: 5,
  },
}

//Функция создания обьекта
const CreateOffer = () => {
  const location = {
    x: getRandomNumber(Location.x.MIN, Location.x.MAX, Location.x.NUMBER_OF_DIGITS),
    y: getRandomNumber(Location.y.MIN, Location.y.MAX, Location.y.NUMBER_OF_DIGITS),
  }

  return {
    author: {
      avatar: `img/avatars/user0${getRandomNumber(1, 8)}.png`,
    },
    location,
    offer: {
      title: 'Великолепная квартира-студия в центре Токио',
      address: `${location.x}, ${location.y}`,
      price: getRandomNumber(Price.MIN, Price.MAX),
      type: Object.values(Type)[getRandomNumber(0, Object.values(Type).length - 1)],
      rooms: getRandomNumber(1, 3),
      guests: getRandomNumber(0, 2),
      checkin: Time[getRandomNumber(0, Time.length - 1)],
      checkout: Time[getRandomNumber(0, Time.length - 1)],
      features: getRandomArray(Object.values(Feature)),
      description: Description[getRandomNumber(0, Description.length - 1)],
      photos: getRandomArray(Photos),
    },
  }
}

export { CreateOffer, COUNT_OF_OFFER };