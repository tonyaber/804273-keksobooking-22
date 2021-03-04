import { addDisabled, adMap, createMainIcon,createIcons, removeDisabled } from './ad-map.js';
import { settingForForm, form } from './setting-for-form.js';
import { fetchGet } from './fetch.js';
import { COUNT_OF_ICONS } from './data.js';
import { filterAds, mapFilter } from './filtr.js';

//настройка формы обьявлений
settingForForm();

//блокировка елементов формы для обьявлений и фильтров для карты
addDisabled(form);
addDisabled(mapFilter);

//создание карты и меток
const map = adMap();
const mainMarker = createMainIcon(map);

//получение данных с сервера
fetchGet((offers) => {
  const markers = createIcons(map, offers, COUNT_OF_ICONS);
  removeDisabled(mapFilter);
  filterAds(markers, offers);
});

export { map, mainMarker };
/*const mapFilter = document.querySelector('.map__filters');
removeDisabled(adForm);
removeDisabled(mapFilter);*/
