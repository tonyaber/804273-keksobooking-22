/* global L: readonly */
import { createCard } from './create-card.js';
import { LocationTokio } from './data.js';

//функция для блокировка елементов формы
const addDisabled = ( parent ) => {
  parent.classList.add('ad-form--disabled');

  for (let i = 0; i < parent.children.length; i++) {
    const child = parent.children[i];
    child.setAttribute('disabled', 'disabled');
  }
}

//функция для снятия блокировки елементов формы
const removeDisabled = (parent) => {
  parent.classList.remove('ad-form--disabled');

  for (let i = 0; i < parent.children.length; i++) {
    const child = parent.children[i];
    child.removeAttribute('disabled', 'disabled');
  }
}

//создание карты
const adMap = () => {
  const map = L.map('map-canvas')
    .on('load', () => {
      const adForm = document.querySelector('.ad-form');
      const mapFilter = document.querySelector('.map__filters');
      removeDisabled(adForm);
      removeDisabled(mapFilter);
    })
    .setView({
      lat: LocationTokio.X,
      lng: LocationTokio.Y,
    }, 10);

  L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    },

  ).addTo(map);

  return map;
}

//добавление главного маркера
const createMainIcon = (map) => {
  const mainIcon = L.icon({
    iconUrl: 'img/main-pin.svg',
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
    }
    const address = document.querySelector('#address');
    address.value = `${LocationMarker.X}, ${LocationMarker.Y}`;
  });

  return mainMarker;
}

//добавление обычных меток
const createIcons = (map, array) => {
  for (let i = 0; i < array.length; i++){
    const card = createCard(array[i]);

    const icon = L.icon({
      iconUrl: 'img/pin.svg',
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
    )
    marker.addTo(map).bindPopup(card);
  }
}

export { addDisabled, adMap, createMainIcon, createIcons};
