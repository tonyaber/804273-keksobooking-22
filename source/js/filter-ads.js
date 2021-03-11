import _ from 'lodash';
import { COUNT_OF_ICONS } from './const.js';
import { deleteMarkers, createIcons } from './add-map.js';
import { map } from './main.js';
import { changeSelected } from './util.js';

const DELAY_ADDING_MARKERS = 500;

const ANY_VALUE = 'any';

const filterForPrice = {
  low: [0, 10000],
  middle: [10000, 50000],
  high: [50000, 10000000],
  any: [0, 10000000],
};

const mapFilter = document.querySelector('.map__filters');
const housingTypes = mapFilter.querySelector('#housing-type');
const housingPrices = mapFilter.querySelector('#housing-price');
const housingRooms = mapFilter.querySelector('#housing-rooms');
const housingGuests = mapFilter.querySelector('#housing-guests');
const housingFeatures = mapFilter.querySelector('#housing-features');

let type;
let price;
let rooms;
let guest;
let featuresList;
let offersList = [];
let markersList = [];
let markersWithFilters = [];
let filteredAd = [];

const typeFilter = (advert, filter) => (filter === ANY_VALUE || advert.offer.type === filter) ?  true : false;

const priceFilter = (advert, filter) => {
  const offerMinPrice = filterForPrice[filter][0];
  const offerMaxPrice = filterForPrice[filter][1];

  if (filter === ANY_VALUE) {
    return true;
  }
  if (advert.offer.price >= offerMinPrice && advert.offer.price < offerMaxPrice) {
    return true;
  }
  return false;
};

const roomFilter = (advert, filter) => (filter === ANY_VALUE || filter === String(advert.offer.rooms)) ? true : false;

const guestFilter = (advert, filter) => (filter === ANY_VALUE || filter === String(advert.offer.guests)) ? true : false;

const featureFilter = (advert, filters) => {
  for (const filter of filters) {
    if (!advert.offer.features.includes(filter)) {
      return false
    }
  }
  return true;
};

const updateMarkers = (filteredAd, markers) => {
  deleteMarkers(markers);
  const newCountOficons = filteredAd.length < COUNT_OF_ICONS ?
    filteredAd.length : COUNT_OF_ICONS;
  return markers = createIcons(map, filteredAd, newCountOficons);
};

const defaultFilters = () => {
  type = ANY_VALUE;
  price = ANY_VALUE;
  rooms = ANY_VALUE;
  guest = ANY_VALUE;
  featuresList = [];
}

const filterAds = (markers, offers) => {
  defaultFilters();

  filteredAd = offers;
  offersList = offers;
  markersList = markers;
  markersWithFilters = markers;

  const filteringOffers = () => filteredAd = offers
    .filter((offer) => typeFilter(offer, type))
    .filter((offer) => priceFilter(offer, price))
    .filter((offer) => roomFilter(offer, rooms))
    .filter((offer) => guestFilter(offer, guest))
    .filter((offer) => featureFilter(offer, featuresList));

  housingTypes.addEventListener('change', _.debounce((evt) => {
    type = evt.target.value;

    const index = evt.target.options.selectedIndex;
    changeSelected(housingTypes, index);

    filteringOffers();

    markersWithFilters = updateMarkers(filteredAd, markersWithFilters);
  }, DELAY_ADDING_MARKERS));

  housingPrices.addEventListener('change', _.debounce((evt) => {
    price = evt.target.value;

    const index = evt.target.options.selectedIndex;
    changeSelected(housingPrices, index);

    filteringOffers();

    markersWithFilters = updateMarkers(filteredAd, markersWithFilters);
  }, DELAY_ADDING_MARKERS));

  housingRooms.addEventListener('change', _.debounce((evt) => {
    rooms = evt.target.value;

    const index = evt.target.options.selectedIndex;
    changeSelected(housingRooms, index);

    filteringOffers();

    markersWithFilters = updateMarkers(filteredAd, markersWithFilters);
  }, DELAY_ADDING_MARKERS));

  housingGuests.addEventListener('change', _.debounce((evt) => {
    guest = evt.target.value;

    const index = evt.target.options.selectedIndex;
    changeSelected(housingGuests, index);

    filteringOffers();

    markersWithFilters = updateMarkers(filteredAd, markersWithFilters);
  }, DELAY_ADDING_MARKERS));

  housingFeatures.addEventListener('change', _.debounce(() => {
    featuresList = Array
      .from(housingFeatures.querySelectorAll('input:checked'))
      .map((advert) => advert.value);

    filteringOffers();

    markersWithFilters = updateMarkers(filteredAd, markersWithFilters);
  }, DELAY_ADDING_MARKERS));
}

//сброс фильтров при очистке формы
const resetFilters = () => {
  changeSelected(housingTypes, 0);
  changeSelected(housingPrices, 0);
  changeSelected(housingRooms, 0);
  changeSelected(housingGuests, 0);

  deleteMarkers(markersWithFilters);
  markersWithFilters = updateMarkers(offersList, markersList);

  filteredAd = offersList;
  defaultFilters();

  mapFilter.reset();
}

export { filterAds, mapFilter, resetFilters };
