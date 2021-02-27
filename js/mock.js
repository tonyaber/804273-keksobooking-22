import { getRandomNumber, getRandomArray, getRandomElementOfArray } from './util.js';

//количество необходимых обьектов
const COUNT_OF_OFFER = 10;

//Массивы  и перечисления
const LocationTokio = {
  X: 35.675,
  Y: 139.75,
};

const Type = {
  PALACE: 'Дворец',
  FLAT: 'Квартира',
  HOUSE: 'Дом',
  BUNGALOW: 'Бунгало',
};

const typeToPrice = {
  bungalow: 0,
  flat: 1000,
  house: 5000,
  palace: 10000,
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
};

const Rooms = {
  MIN: 1,
  MAX: 3,
};

const Guests = {
  MIN: 0,
  MAX: 2,
};

const capacityArray = [3, 2, 1, 0];

const roomToCapacity = {
  1: [2],
  2: [1, 2],
  3: [0, 1, 2],
  100: [3],
};

//Функция создания обьекта
const CreateOffer = () => {
  const location = {
    x: getRandomNumber(Location.x.MIN, Location.x.MAX, Location.x.NUMBER_OF_DIGITS),
    y: getRandomNumber(Location.y.MIN, Location.y.MAX, Location.y.NUMBER_OF_DIGITS),
  };

  return {
    author: {
      avatar: `img/avatars/user0${getRandomNumber(1, 8)}.png`,
    },
    location,
    offer: {
      title: 'Великолепная квартира-студия в центре Токио',
      address: `${location.x}, ${location.y}`,
      price: getRandomNumber(Price.MIN, Price.MAX),
      type: getRandomElementOfArray(Object.values(Type)),
      rooms: getRandomNumber(Rooms.MIN, Rooms.MAX),
      guests: getRandomNumber(Guests.MIN, Guests.MAX),
      checkin: getRandomElementOfArray(Time),
      checkout: getRandomElementOfArray(Time),
      features: getRandomArray(Object.keys(Feature)),
      description: getRandomElementOfArray(Description),
      photos: getRandomArray(Photos),
    },
  };
}

//const offers = new Array(COUNT_OF_OFFERauthot).fill(null).map(() => CreateOffer());
export { CreateOffer, LocationTokio, COUNT_OF_OFFER, typeToPrice, roomToCapacity, capacityArray, Type };
