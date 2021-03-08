const COUNT_OF_ICONS = 10;

const URL_GET = 'https://22.javascript.pages.academy/keksobooking/data';
const URL_POST = 'https://22.javascript.pages.academy/keksobooking';

const LocationTokio = {
  X: 35.675,
  Y: 139.75,
};

const HousingType = {
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

const roomToCapacity = {
  1: [2],
  2: [1, 2],
  3: [0, 1, 2],
  100: [3],
};


export { COUNT_OF_ICONS, LocationTokio, typeToPrice, roomToCapacity, HousingType, URL_GET, URL_POST };
