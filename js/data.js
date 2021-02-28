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

const roomToCapacity = {
  1: [2],
  2: [1, 2],
  3: [0, 1, 2],
  100: [3],
};

const capacityArray = [3, 2, 1, 0];

export { LocationTokio, typeToPrice, roomToCapacity, capacityArray, Type };
