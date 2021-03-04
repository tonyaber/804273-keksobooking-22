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

const mapFilter = document.querySelector('.map__filters');
const housingType = mapFilter.querySelector('#housing-type');
const housingPrice = mapFilter.querySelector('#housing-price');
const housingRooms = mapFilter.querySelector('#housing-rooms');
const housingGuests = mapFilter.querySelector('#housing-guests');
const housingFeatures = mapFilter.querySelector('#housing-features');
const housingFeaturesCheck = housingFeatures.querySelectorAll('input[name="features"]');

const typeFilter = (advert, filter) => {
  if (filter === 'any' || advert.offer.type === filter) {
    return true;
  }
  return false;
}

const priceFilter = (advert, filter) => {
  if (advert.offer.price >= filterForPrice[filter][0] && advert.offer.price < filterForPrice[filter][1]) {
    return true;
  }
  else if (filter === 'any') {
    return true;
  }
  return false;
}

const roomFilter = (advert, filter) => {
  if (filter === 'any' || filter === String(advert.offer.rooms)) {
    return true;
  }
  return false;
}

const guestFilter = (advert, filter) => {
  if (filter === 'any' || filter === String(advert.offer.guests)) {
    return true;
  }
  return false;
}

const featureFilter = (advert, filter) => {
  if (advert.offer.features.includes(filter)){
    return true;
  }
  return false;
}

const intersectionOfFilters  = (arrayfirst, arraysecond) => {
  let intersection = arrayfirst.filter(x => arraysecond.includes(x));
  return intersection
}

const filterAds = (markers, offers) => {
  let type = 'any';
  let filteredAddType = offers;
  let filteredAddPrice = offers;
  let filteredAddRoom = offers;
  let filteredAddGuest = offers;
  let filteredAddFeature = offers;
  let featuresList = [];

  housingType.addEventListener('change', (evt) => {
    type = evt.target.value;
    filteredAddType = offers.filter((offer) => typeFilter(offer, type));
  })

  housingPrice.addEventListener('change', (evt) => {
    type = evt.target.value;
    filteredAddPrice = offers.filter((offer) => priceFilter(offer, type));
  })

  housingRooms.addEventListener('change', (evt) => {
    type = evt.target.value;
    filteredAddRoom = offers.filter((offer) => roomFilter(offer, type));
  })

  housingGuests.addEventListener('change', (evt) => {
    type = evt.target.value;
    filteredAddGuest = offers.filter((offer) => guestFilter(offer, type));
  })

  housingFeatures.addEventListener('change', (evt) => {
    type = evt.target.value;
    const index = filterForFeatures.findIndex((value) => {
      return value === type;
    });
    if (featuresList.length === 0) {
      filteredAddFeature = [];
      if (housingFeaturesCheck[index].checked) {
        filteredAddFeature = offers.filter((offer) => featureFilter(offer, type));
        featuresList.push(type);
      }
    }
    else if (housingFeaturesCheck[index].checked) {
      filteredAddFeature = filteredAddFeature.filter((offer) => featureFilter(offer, type));
      featuresList.push(type)
    }
    else {
      featuresList = featuresList.filter(function (item) {
        return item !== type;
      })

      filteredAddFeature = [];

      for (let i = 0; i < offers.length; i++){
        const isElementIncludes = (element) => {
          return offers[i].offer.features.includes(element);
        }

        if (featuresList.every(isElementIncludes)) {
          filteredAddFeature.push(offers[i])
        }
      }
    }
  })

  mapFilter.addEventListener('change', () => {
    deleteMarkers(markers);
    let filteredAdd = intersectionOfFilters(offers, filteredAddType);
    filteredAdd = intersectionOfFilters(filteredAdd, filteredAddPrice);
    filteredAdd = intersectionOfFilters(filteredAdd, filteredAddRoom);
    filteredAdd = intersectionOfFilters(filteredAdd, filteredAddGuest);
    filteredAdd = intersectionOfFilters(filteredAdd, filteredAddFeature);

    const newCountOficons = filteredAdd.length < COUNT_OF_ICONS ?
      filteredAdd.length : COUNT_OF_ICONS;

    markers = createIcons(map, filteredAdd, newCountOficons);
  })
}
/*
const filterType = (markers, offers) => {

  mapFilter.addEventListener('change', (evt) => {

    const typeValue = evt.target.value;
    let filterType = [];
    deleteMarkers(markers);
    filterType = [];

    for (let i = 0; i < offers.length; i++) {
      if (typeValue === offers[i].offer.type) {
        filterType.push(offers[i]);
      } else if (typeValue === 'any') {
        filterType.push(offers[i]);
      }
    }

    let newCountOficons = filterType.length < COUNT_OF_ICONS ?
      filterType.length : COUNT_OF_ICONS;

    markers = createIcons(map, filterType, newCountOficons);

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
    newCountOficons = filterPrice.length < COUNT_OF_ICONS ?
      filterPrice.length : COUNT_OF_ICONS;

    markers = createIcons(map, filterPrice, newCountOficons);

  })

}

const filterPrice = (markers, offers) => {



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
*/
export { filterAds, mapFilter};
