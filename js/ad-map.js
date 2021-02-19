/* global L: readonly */
import { createCard } from './create-card.js';
//координаты центра Токио
const LocationTokio = {
  X: 35.675,
  Y: 139.75,
};

//поле адреса
const address = document.querySelector('#address');
address.setAttribute('readonly', 'readonly');
address.value = `${LocationTokio.X}, ${LocationTokio.Y}`;

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
    }, 13);

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
    iconUrl: '../img/main-pin.svg',
    iconSize: [60, 80],
    iconAnchor: [30, 80],
  });

  const mainMarker = L.marker(
    {
      lat: 35.675,
      lng: 139.75,
    },
    {
      draggable: true,
      icon: mainIcon,
    },
  ).addTo(map);

  mainMarker.on('moveend', (evt) => {
    const LocationMarker = {
      X: evt.target.getLatLng().lat.toFixed(5),
      Y: evt.target.getLatLng().lng.toFixed(5),
    }
    address.value = `${LocationMarker.X}, ${LocationMarker.Y}`;
  });
}
//добавление обычных меток
const createIcons = (map, array) => {
  for (let i = 0; i < array.length; i++){

    const card = createCard(array[i]);
    const icon = L.icon({
      iconUrl: '../img/pin.svg',
      iconSize: [52, 52],
      iconAnchor: [26, 52],
    });
    const marker = L.marker(
      {
        lat: array[i].location.x,
        lng: array[i].location.y,
      },
      {
        icon: icon,
      },
    )
    marker.addTo(map).bindPopup(card);
  }
}

export { addDisabled, adMap, createMainIcon, createIcons };
