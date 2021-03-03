import { COUNT_OF_ICONS } from './data.js';
import { deleteMarkers, createIcons } from './ad-map.js';
import { map } from './main.js';

const filter = document.querySelector('.map__filters');
const typeFilter = filter.querySelector('#housing-type');

const filterAds = (markers, offers) => {
  typeFilter.addEventListener('change', (evt) => {
    deleteMarkers(markers);

    let filterOffers = [];

    for (let i = 0; i < offers.length; i++){
      if (evt.target.value == offers[i].offer.type ) {
        filterOffers.push(offers[i]);
      }
      else if (evt.target.value == 'any') {
        filterOffers.push(offers[i]);
      }
    }

    let newCountOficons = COUNT_OF_ICONS;

    if (filterOffers.length < COUNT_OF_ICONS) {
      newCountOficons = filterOffers.length;
    }

    markers = createIcons(map, filterOffers, newCountOficons);
  })
}

export { filterAds };
