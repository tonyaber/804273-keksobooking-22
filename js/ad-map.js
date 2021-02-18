import { CreateOffer, COUNT_OF_OFFER } from './mock.js';
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
const addDisabled = (classForm) => {
  const parent = document.querySelector(classForm);
  parent.classList.add('ad-form--disabled');

  for (let i = 0; i < parent.children.length; i++) {
    const child = parent.children[i];
    child.setAttribute('disabled', 'disabled');
  }
}

//функция для снятия блокировки елементов формы
const removeDisabled = (classForm) => {
  const parent = document.querySelector(classForm);
  parent.classList.remove('ad-form--disabled');

  for (let i = 0; i < parent.children.length; i++) {
    const child = parent.children[i];
    child.removeAttribute('disabled', 'disabled');
  }
}

//блокировка елементов формы для обьявлений и фильтров для карты
addDisabled('.ad-form');
addDisabled('.map__filters');

//Добавление карты
const map = L.map('map-canvas')
  .on('load', () => {
    removeDisabled('.ad-form');
    removeDisabled('.map__filters');
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

////добавление главного маркера
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

//добавление обычных меток
const offers = new Array(COUNT_OF_OFFER).fill(null).map(() => CreateOffer());

for (let i = 0; i < offers.length; i++){

  let card = createCard(offers[i]);
  const icon = L.icon({
    iconUrl: '../img/pin.svg',
    iconSize: [52, 52],
    iconAnchor: [26, 52],
  });
  const marker = L.marker(
    {
      lat: offers[i].location.x,
      lng: offers[i].location.y,
    },
    {
      icon: icon,
    },
  )
  marker.addTo(map).bindPopup(card);
}
