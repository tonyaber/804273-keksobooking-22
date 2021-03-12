import { addDisabled, addMap, createMainIcon, createIcons, removeDisabled } from './add-map.js';
import { settingForForm, form } from './setting-for-form.js';
import { getData } from './fetch.js';
import { COUNT_OF_ICONS } from './const.js';
import { filterAds, mapFilter } from './filter-ads.js';

//блокировка елементов формы для обьявлений и фильтров для карты
addDisabled(form);
addDisabled(mapFilter);

//настройка формы обьявлений
settingForForm();

//создание карты и меток
const map = addMap();
const mainMarker = createMainIcon(map);

//получение данных с сервера
getData((offers) => {
  const markers = createIcons(map, offers, COUNT_OF_ICONS);
  removeDisabled(mapFilter);
  filterAds(markers, offers);
});

export { map, mainMarker };
