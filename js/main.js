
import { addDisabled, adMap, createMainIcon } from './ad-map.js';
import { settingForForm } from './setting-for-form.js';
import './fetch.js';

//настройка формы обьявлений
settingForForm();

//блокировка елементов формы для обьявлений и фильтров для карты
const adForm = document.querySelector('.ad-form');
const mapFilter = document.querySelector('.map__filters');
addDisabled(adForm);
addDisabled(mapFilter);

//создание карты и меток
const map = adMap();
createMainIcon(map);

export { map };


