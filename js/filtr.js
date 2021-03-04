import { COUNT_OF_ICONS } from './data.js';
import { deleteMarkers, createIcons } from './ad-map.js';
import { map } from './main.js';
const filterForPrice = {
  low: [0, 10000],
  middle: [10000, 50000],
  high: [50000, 1000000],
  any: [0, 1000000],
}

const filterForFeatures = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

const filter = document.querySelector('.map__filters');
const HousingType = filter.querySelector('#housing-type');
const housingPrice = filter.querySelector('#housing-price');
const housingRooms = filter.querySelector('#housing-rooms');
const housingGuests = filter.querySelector('#housing-guests');
const housingFeatures = filter.querySelector('#housing-features');
const housingFeaturesCheck = housingFeatures.querySelectorAll('input[name="features"]');

const filterAds = (markers, offers) => {
  HousingType.addEventListener('change', (evt) => {
    const typeValue = evt.target.value;

    deleteMarkers(markers);

    const filterOffers = [];

    for (let i = 0; i < offers.length; i++) {
      if (typeValue === offers[i].offer.type) {
        filterOffers.push(offers[i]);
      } else if (typeValue === 'any') {
        filterOffers.push(offers[i]);
      }
    }

    const newCountOficons = filterOffers.length < COUNT_OF_ICONS ?
      filterOffers.length : COUNT_OF_ICONS;

    markers = createIcons(map, filterOffers, newCountOficons);
  })

  housingPrice.addEventListener('change', (evt) => {
    deleteMarkers(markers);

    const priceValue = evt.target.value;

    const filterPrice = [];

    for (let i = 0; i < offers.length; i++) {
      if (filterForPrice[priceValue][0] <= offers[i].offer.price && filterForPrice[evt.target.value][1] > offers[i].offer.price) {
        filterPrice.push(offers[i]);
      }
      else if (priceValue === 'any') {
        filterPrice.push(offers[i]);
      }
    }
    const newCountOficons = filterPrice.length < COUNT_OF_ICONS ?
      filterPrice.length : COUNT_OF_ICONS;

    markers = createIcons(map, filterPrice, newCountOficons);
  })

  housingRooms.addEventListener('change', (evt) => {
    const roomValue = evt.target.value;

    deleteMarkers(markers);

    const filterRooms = [];

    for (let i = 0; i < offers.length; i++) {
      if (roomValue === String(offers[i].offer.rooms)) {
        filterRooms.push(offers[i]);
      } else if (roomValue === 'any') {
        filterRooms.push(offers[i]);
      }
    }

    const newCountOficons = filterRooms.length < COUNT_OF_ICONS ?
      filterRooms.length : COUNT_OF_ICONS;

    markers = createIcons(map, filterRooms, newCountOficons);
  })

  housingGuests.addEventListener('change', (evt) => {
    const guestValue = evt.target.value;

    deleteMarkers(markers);

    const filterGuests = [];

    for (let i = 0; i < offers.length; i++) {
      if (guestValue === String(offers[i].offer.guests)) {
        filterGuests.push(offers[i]);
      } else if (guestValue === 'any') {
        filterGuests.push(offers[i]);
      }
    }

    const newCountOficons = filterGuests.length < COUNT_OF_ICONS ?
      filterGuests.length : COUNT_OF_ICONS;

    markers = createIcons(map, filterGuests, newCountOficons);
  })

  let filterFeatures = [];
  let features = [];
  housingFeatures.addEventListener('input', (evt) => {
    deleteMarkers(markers);


    const featureValue = evt.target.value;
    const index = filterForFeatures.findIndex((value) => {
      return value === featureValue;
    });

    if (filterFeatures.length === 0) {
      if (housingFeaturesCheck[index].checked) {
        for (let j = 0; j < offers.length; j++) {
          if (offers[j].offer.features.includes(featureValue)) {
            filterFeatures.push(offers[j]);
          }
        }
        features.push(featureValue)
      }
    } else {
      if (housingFeaturesCheck[index].checked) {
        for (let j = filterFeatures.length - 1; j >= 0; j--) {
          if (!filterFeatures[j].offer.features.includes(featureValue)) {
            filterFeatures.splice(j, 1)
          }
        }
        features.push(featureValue)
      }
      else {
        for (let i = features.length-1; i >=0; i--){
          if (features[i].includes(featureValue)) {
            features.splice(i, 1);
          }
        }
        for (let i = 0; i < offers.length; i++) {
          let k = 0;
          for (let j = 0; j < features.length; j++){
            if (offers[i].offer.features.includes(features[j])) {
              k++;
            }
          }
          if (k >= features.length) {
            filterFeatures.push(offers[i]);
          }
        }
      }
    }
    markers = createIcons(map, filterFeatures, filterFeatures.length);
  })



}

export { filterAds, filter };
