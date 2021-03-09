/* global _:readonly */
import { COUNT_OF_ICONS } from './data.js';
import { deleteMarkers, createIcons } from './add-map.js';
import { map } from './main.js';

const filterForPrice = {
  low: [0, 10000],
  middle: [10000, 50000],
  high: [50000, 10000000],
  any: [0, 10000000],
};

const DELAY_ADDING_MARKERS = 500;

const mapFilter = document.querySelector('.map__filters');
const housingType = mapFilter.querySelector('#housing-type');
const housingPrice = mapFilter.querySelector('#housing-price');
const housingRooms = mapFilter.querySelector('#housing-rooms');
const housingGuests = mapFilter.querySelector('#housing-guests');
const housingFeatures = mapFilter.querySelector('#housing-features');

const typeFilter = (advert, filter) => (filter === 'any' || advert.offer.type === filter) ?  true : false;

const priceFilter = (advert, filter) => {
  const offerMinPrice = filterForPrice[filter][0];
  const offerMaxPrice = filterForPrice[filter][1];

  if (advert.offer.price >= offerMinPrice && advert.offer.price < offerMaxPrice) {
    return true;
  }
  else if (filter === 'any') {
    return true;
  }
  return false;
};

const roomFilter = (advert, filter) => (filter === 'any' || filter === String(advert.offer.rooms)) ? true : false;

const guestFilter = (advert, filter) => (filter === 'any' || filter === String(advert.offer.guests)) ? true : false;

const featureFilter = (advert, filters) => {
  for (const filter of filters) {
    if (!advert.offer.features.includes(filter)) {
      return false
    }
  }
  return true;
};

const filterAds = (markers, offers) => {
  let type = 'any';
  let price = 'any';
  let rooms = 'any';
  let guest = 'any';
  let featuresList = [];
  let filteredAd = offers;

  const unpdateMarkers = () => {
    deleteMarkers(markers);
    const newCountOficons = filteredAd.length < COUNT_OF_ICONS ?
      filteredAd.length : COUNT_OF_ICONS;
    markers = createIcons(map, filteredAd, newCountOficons);
  };

  const filteringOffers = () => filteredAd = offers
    .filter((offer) => typeFilter(offer, type))
    .filter((offer) => priceFilter(offer, price))
    .filter((offer) => roomFilter(offer, rooms))
    .filter((offer) => guestFilter(offer, guest))
    .filter((offer) => featureFilter(offer, featuresList));

  housingType.addEventListener('change', _.debounce((evt) => {
    type = evt.target.value;
    filteringOffers();
    unpdateMarkers();
  }, DELAY_ADDING_MARKERS));

  housingPrice.addEventListener('change', _.debounce((evt) => {
    price = evt.target.value;
    filteringOffers();
    unpdateMarkers();
  }, DELAY_ADDING_MARKERS));

  housingRooms.addEventListener('change', _.debounce((evt) => {
    rooms = evt.target.value;
    filteringOffers();
    unpdateMarkers();
  }, DELAY_ADDING_MARKERS));

  housingGuests.addEventListener('change', _.debounce((evt) => {
    guest = evt.target.value;
    filteringOffers();
    unpdateMarkers();
  }, DELAY_ADDING_MARKERS));

  housingFeatures.addEventListener('change', _.debounce(() => {
    featuresList = Array
      .from(housingFeatures.querySelectorAll('input:checked'))
      .map((advert) => advert.value);

    filteringOffers();
    unpdateMarkers();
  }, DELAY_ADDING_MARKERS));
}

export { filterAds, mapFilter };
