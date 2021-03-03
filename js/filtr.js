import { COUNT_OF_ICONS } from './data.js';
import { deleteMarkers, createIcons } from './ad-map.js';
import { map } from './main.js';
const filterForPrice = {
  low: [0, 10000],
  middle: [10000, 50000],
  high: [50000, 1000000],
  any: [0, 1000000],
}

const filter = document.querySelector('.map__filters');
const typeFilter = filter.querySelector('#housing-type');
const housingPrice = filter.querySelector('#housing-price');

const filterAds = (markers, offers) => {
  typeFilter.addEventListener('change', (evt) => {
    deleteMarkers(markers);

    const filterOffers = [];

    for (let i = 0; i < offers.length; i++) {
      if (evt.target.value === offers[i].offer.type) {
        filterOffers.push(offers[i]);
      }
    }

    const newCountOficons = filterOffers.length < COUNT_OF_ICONS ?
      filterOffers.length : COUNT_OF_ICONS;

    markers = createIcons(map, filterOffers, newCountOficons);
  })

  housingPrice.addEventListener('change', (evt) => {
    deleteMarkers(markers);

    const filterPrice = [];
    for (let i = 0; i < offers.length; i++) {
      if (filterForPrice[evt.target.value][0] <= offers[i].offer.price && filterForPrice[evt.target.value][1] > offers[i].offer.price) {
        filterPrice.push(offers[i]);
      }
      else if (evt.target.value === 'any') {
        filterPrice.push(offers[i]);
      }
    }
    const newCountOficons = filterPrice.length < COUNT_OF_ICONS ?
      filterPrice.length : COUNT_OF_ICONS;

    markers = createIcons(map, filterPrice, newCountOficons);
  })

}

export { filterAds, filter };
