import { addDisabled, adMap, createMainIcon,createIcons } from './ad-map.js';
import { settingForForm } from './setting-for-form.js';
import { fetchGet } from './fetch.js';
import { COUNT_OF_ICONS } from './data.js';
import { filterAds } from './filtr.js';

//настройка формы обьявлений
settingForForm();

//блокировка елементов формы для обьявлений и фильтров для карты
const adForm = document.querySelector('.ad-form');
const mapFilter = document.querySelector('.map__filters');
addDisabled(adForm);
addDisabled(mapFilter);

//создание карты и меток
const map = adMap();
const mainMarker = createMainIcon(map);

//получение данных с сервера
fetchGet((offers) => {
  let markers = createIcons(map, offers, COUNT_OF_ICONS);
  filterAds(markers, offers);
});

export { map, mainMarker };
