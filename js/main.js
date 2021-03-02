import { addDisabled, adMap, createMainIcon } from './ad-map.js';
import { settingForForm } from './setting-for-form.js';
import { fetchGet } from './fetch.js';


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
fetchGet();

export { map, mainMarker };
