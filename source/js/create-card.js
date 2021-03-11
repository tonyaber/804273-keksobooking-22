import { HousingType } from './const.js';

//Добавить несколько фото в обьявление
const addPhoto = (templatePhoto, adPhoto, templatePhotoParent) => {
  templatePhotoParent.innerHTML = '';

  adPhoto.forEach(photo => {
    const newPhoto = templatePhoto.cloneNode(true);
    newPhoto.src = photo;
    templatePhotoParent.appendChild(newPhoto);
  })

};

//Добавить удобства
const addFeature = (adFeature, templateFeatureParent) => {
  templateFeatureParent.innerHTML = '';

  const featureClass = 'popup__feature';

  adFeature.forEach(feature => {
    const newFeature = document.createElement('li');
    newFeature.classList.add(featureClass, featureClass + '--' + feature);
    templateFeatureParent.appendChild(newFeature);
  });
};

const template = document.querySelector('#card').content;
const templatePopup = template.querySelector('.popup');

const createCard = (array) => {
  const card = templatePopup.cloneNode(true);

  card.querySelector('.popup__title').textContent = array.offer.title;
  card.querySelector('.popup__text--address').textContent = array.offer.address;
  card.querySelector('.popup__text--price').
    innerHTML = `${array.offer.price} <span>₽/ночь</span>`;
  card.querySelector('.popup__type').
    textContent = HousingType[array.offer.type.toUpperCase()];
  card.querySelector('.popup__description').
    textContent = array.offer.description;
  card.querySelector('.popup__avatar').src = array.author.avatar;
  card.querySelector('.popup__text--capacity').
    textContent = `${array.offer.rooms} комнаты для ${array.offer.guests} гостей`;
  card.querySelector('.popup__text--time').
    textContent = `Заезд после ${array.offer.checkin}, выезд до ${array.offer.checkout}`;

  if (!array.offer.rooms || !array.offer.guests) {
    card.querySelector('.popup__text--capacity').classList.add('hidden');
  }

  if (!parseInt(array.offer.checkin) || !parseInt(array.offer.checkout)) {
    card.querySelector('.popup__text--time').classList.add('hidden');
  }

  const features = card.querySelector('.popup__features');
  addFeature(array.offer.features, features);

  const photos = card.querySelector('.popup__photos');
  const photo = photos.querySelector('.popup__photo');
  addPhoto(photo, array.offer.photos, photos);
  return card;
};

export { createCard };
