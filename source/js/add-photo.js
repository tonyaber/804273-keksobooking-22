const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

const addPhoto = (fileChooser, preview) => {
  let img = preview.querySelector('img');

  fileChooser.addEventListener('change', () => {
    if (!preview.contains(img)) {
      img = document.createElement('img');

      img.setAttribute('alt', 'Фото жилья');
      img.setAttribute('width', 40);
      img.setAttribute('height', 44);

      preview.style.display = 'flex';
      preview.style.alignItems = 'center';
      preview.style.padding = '0 15px';

      preview.appendChild(img);
    }

    let file = fileChooser.files[0];
    const fileName = file.name.toLowerCase();

    const matches = FILE_TYPES.some((it) => fileName.endsWith(it));
    
    (!matches) ? fileChooser.setCustomValidity('Недопустимый формат') : fileChooser.setCustomValidity('');

    if (matches) {
      const reader = new FileReader();

      reader.addEventListener('load', () => img.src = reader.result);

      reader.readAsDataURL(file);
    }
  });
  return img;
};

export { addPhoto };
