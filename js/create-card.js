//Добавить несколько фото в обьявление
const addPhoto = (array, photo, parent) => {
  parent.innerHTML = '';
  for (let i = 0; i < photo.length; i++) {
    const newPhoto = array.cloneNode(true);
    newPhoto.src = photo[i];
    parent.appendChild(newPhoto);
  }
}

//Добавить удобства (Array.from(array)
const addFeature = (array, features, parent) => {
  parent.innerHTML = '';
  features.forEach(feature => {
    const featureNew = feature.toLowerCase();
    array.forEach(value => {
      const valueNew = value.className;
      if (valueNew.indexOf(featureNew) >= 0) {
        parent.appendChild(value);
      }
    });
  });
}

const template = document.querySelector('#card').content;
const templatePopup = template.querySelector('.popup');
const fragment = document.createDocumentFragment();

const createCard = (array) => {
  const card = templatePopup.cloneNode(true);

  card.querySelector('.popup__title').textContent = array.offer.title;
  card.querySelector('.popup__text--address').textContent = array.offer.address;
  card.querySelector('.popup__text--price').
    innerHTML = `${array.offer.price} <span>₽/ночь</span>`;
  card.querySelector('.popup__type').textContent = array.offer.type;
  card.querySelector('.popup__text--capacity').
    textContent = `${array.offer.rooms} комнаты для ${array.offer.guests} гостей`;
  card.querySelector('.popup__text--time').
    textContent = `Заезд после ${array.offer.checkin}, выезд до ${array.offer.checkout}`;
  card.querySelector('.popup__description').
    textContent = array.offer.description;
  card.querySelector('.popup__avatar').src = array.author.avatar;

  const features = card.querySelector('.popup__features');
  const feature = features.querySelectorAll('.popup__feature');

  addFeature(feature, array.offer.features, features);

  const photos = card.querySelector('.popup__photos');
  const photo = photos.querySelector('.popup__photo');
  addPhoto(photo, array.offer.photos, photos);


  fragment.appendChild(card);
  return fragment;
}

export { createCard };
  
/*for (переменная of коллекция) {}
const nF = (array, features, parent) => {
  const i = Array.from(array);
  console.log(i)
  console.log(features)
  const index = array.findIndex((value) => {
    return value.indexOf(features[0].toLowerCase()) >= 0;
  });
  console.log(index)
}
nF()*/
