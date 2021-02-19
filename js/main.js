import { setPriceAndTime } from './set-price-and-time.js';
import { addDisabled, adMap, createMainIcon, createIcons } from './ad-map.js';
import { CreateOffer, COUNT_OF_OFFER } from './mock.js';

//установить цену и время заезда/выезда
setPriceAndTime();

//блокировка елементов формы для обьявлений и фильтров для карты
const adForm = document.querySelector('.ad-form');
const mapFilter = document.querySelector('.map__filters');
addDisabled(adForm);
addDisabled(mapFilter);

//создание карты и меток
const map = adMap();
createMainIcon(map);
const offers = new Array(COUNT_OF_OFFER).fill(null).map(() => CreateOffer());
createIcons(map, offers);

