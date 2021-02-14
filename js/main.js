import { createCard } from './data.js';
import { CreateOffer } from './mock.js';

const offers = new Array(1).fill(null).map(() => CreateOffer());

let map = document.querySelector('.map__canvas');

const card = createCard(offers[0]);

map.appendChild(card);


