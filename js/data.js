import { addPhoto, addFeature } from './util.js';

const template = document.querySelector('#card').content;
const templatePopup = template.querySelector('.popup');
const fragment = document.createDocumentFragment();

const createCard = (array) => {
  const card = templatePopup.cloneNode(true);
  let title = card.querySelector('.popup__title');
  title.textContent = array.offer.title;
  let address = card.querySelector('.popup__text--address');
  address.textContent = array.offer.address;
  let price = card.querySelector('.popup__text--price');
  price.textContent = `${ array.offer.price } ₽/ночь`;
  let type = card.querySelector('.popup__type');
  type.textContent = array.offer.type;
  let capacity = card.querySelector('.popup__text--capacity');
  capacity.textContent = `${array.offer.rooms} комнаты для ${array.offer.guests} гостей`;
  let time = card.querySelector('.popup__text--time');
  time.textContent = `Заезд после ${array.offer.checkin}, выезд до ${array.offer.checkout}`;
  let features = card.querySelector('.popup__features');
  let feature = features.querySelectorAll('.popup__feature');
  addFeature(feature, array.offer.features, features)
  let description = card.querySelector('.popup__description');
  description.textContent = array.offer.description;
  let photos = card.querySelector('.popup__photos');
  let photo = photos.querySelector('.popup__photo');
  addPhoto(photo, array.offer.photos, photos);
  let avatar = card.querySelector('.popup__avatar');
  avatar.src = array.author.avatar;
  fragment.appendChild(card);
  return fragment;
}

export { createCard };
