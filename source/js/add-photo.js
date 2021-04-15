const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

let container = document.querySelector('.ad-form__photo-container');

const addPhotoAvatar = (fileChooser, preview) => {
  let img = preview.querySelector('img');

  fileChooser.addEventListener('change', () => {
    let file = fileChooser.files[0];
    const fileName = file.name.toLowerCase();

    const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

    (!matches) ? fileChooser.setCustomValidity('Недопустимый формат') : fileChooser.setCustomValidity('');

    if (matches) {
      const reader = new FileReader();

      reader.addEventListener('load', () => {
        img.src = reader.result
      });

      reader.readAsDataURL(file);
    }
  });
  return img;
};

const addPhotoAd = (fileChooser,preview) => {


  fileChooser.addEventListener('change', () => {
    if (container.contains(preview)) {
      container.removeChild(preview);
    }
    for (let i = 0; i < fileChooser.files.length; i++){
      let img = document.createElement('img');
      const previewNew = document.createElement('div');
      previewNew.classList.add('ad-form__photo');
      img = document.createElement('img');

      img.setAttribute('alt', 'Фото жилья');
      img.setAttribute('width', 40);
      img.setAttribute('height', 44);

      previewNew.style.display = 'flex';
      previewNew.style.alignItems = 'center';
      previewNew.style.padding = '0 15px';
      previewNew.style.position = 'relative';
      let photoClose = document.createElement('a');
      photoClose.setAttribute('href', '#');
      photoClose.classList.add('photo-close');
      photoClose.style.zIndex = 100;
      photoClose.style.textDecoration = 'none';
      photoClose.style.position = 'absolute';
      photoClose.style.right = '0';
      photoClose.style.top = '0';
      photoClose.style.color = 'red';
      photoClose.style.padding = '5px';
      photoClose.style.fontSize = '12px';
      photoClose.style.textAlign = 'right';
      photoClose.textContent = '×';
      previewNew.append(photoClose);

      previewNew.append(img);
      container.append(previewNew);
      let file = fileChooser.files[i];
      const fileName = file.name.toLowerCase();

      const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

      (!matches) ? fileChooser.setCustomValidity('Недопустимый формат') : fileChooser.setCustomValidity('');

      if (matches) {
        const reader = new FileReader();

        reader.addEventListener('load', () => {
          img.src = reader.result
        });

        reader.readAsDataURL(file);
       
        photoClose.addEventListener('click', (evt) => {
          evt.preventDefault();
          container.removeChild(previewNew);
        })
      }
    }


  });
};

export { addPhotoAvatar, addPhotoAd };
