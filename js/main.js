import { addDisabled, adMap, createMainIcon, createIcons, removeDisabled } from './ad-map.js';
import { settingForForm, form } from './setting-for-form.js';
import { dataGet } from './fetch.js';
import { COUNT_OF_ICONS } from './data.js';
import { filterAds, mapFilter } from './filter-ads.js';

//блокировка елементов формы для обьявлений и фильтров для карты
addDisabled(form);
addDisabled(mapFilter);

//настройка формы обьявлений
settingForForm();

//создание карты и меток
const map = adMap();
const mainMarker = createMainIcon(map);

//получение данных с сервера
dataGet((offers) => {
  const markers = createIcons(map, offers, COUNT_OF_ICONS);
  removeDisabled(mapFilter);
  filterAds(markers, offers);
});

export { map, mainMarker };
