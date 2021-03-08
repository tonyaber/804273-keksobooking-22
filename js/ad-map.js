/* global L: readonly */
import { createCard } from './create-card.js';
import { LocationTokio } from './data.js';
import { form } from './setting-for-form.js';

const TILE_LAYER_URL = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const TILE_LAYER_ATTRIBUTION = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
const MAIN_ICON_URL = 'img/main-pin.svg';
const SIMPLE_ICON_URL = 'img/pin.svg';

//функция для блокировка елементов формы
const addDisabled = (parent) => {
  parent.classList.add('ad-form--disabled');

  for (let i = 0; i < parent.children.length; i++) {
    const child = parent.children[i];
    child.setAttribute('disabled', 'disabled');
  }
};

//функция для снятия блокировки елементов формы
const removeDisabled = (parent) => {
  parent.classList.remove('ad-form--disabled');

  for (let i = 0; i < parent.children.length; i++) {
    const child = parent.children[i];
    child.removeAttribute('disabled', 'disabled');
  }
};

//создание карты
const adMap = () => {
  const map = L.map('map-canvas')
    .on('load', () => {
      removeDisabled(form);
    })
    .setView({
      lat: LocationTokio.X,
      lng: LocationTokio.Y,
    }, 10);

  L.tileLayer(
    TILE_LAYER_URL,
    {
      attribution: TILE_LAYER_ATTRIBUTION,
    },

  ).addTo(map);

  return map;
};

//добавление главного маркера
const createMainIcon = (map) => {
  const mainIcon = L.icon({
    iconUrl: MAIN_ICON_URL,
    iconSize: [60, 80],
    iconAnchor: [30, 80],
  });

  const mainMarker = L.marker(
    {
      lat: LocationTokio.X,
      lng: LocationTokio.Y,
    },
    {
      draggable: true,
      icon: mainIcon,
    },
  ).addTo(map);

  mainMarker.on('move', (evt) => {
    const LocationMarker = {
      X: evt.target.getLatLng().lat.toFixed(5),
      Y: evt.target.getLatLng().lng.toFixed(5),
    };
    const address = document.querySelector('#address');
    address.value = `${LocationMarker.X}, ${LocationMarker.Y}`;
  });

  return mainMarker;
};

//добавление обычных меток
const createIcons = (map, array, count) => {
  let markerArr = [];

  for (let i = 0; i < count; i++){
    const card = createCard(array[i]);

    const icon = L.icon({
      iconUrl: SIMPLE_ICON_URL,
      iconSize: [52, 52],
      iconAnchor: [26, 52],
    });

    const marker = L.marker(
      {
        lat: array[i].location.lat,
        lng: array[i].location.lng,
      },
      {
        icon: icon,
      },
    );
    marker.addTo(map).bindPopup(card);
    markerArr.push(marker);
  }
  return markerArr;
};

//удаление маркеров
const deleteMarkers = (markers) => {
  for(let i = 0; i < markers.length; i++) {
    markers[i].remove();
  }
};

export { addDisabled, removeDisabled, adMap, createMainIcon, createIcons, deleteMarkers};
