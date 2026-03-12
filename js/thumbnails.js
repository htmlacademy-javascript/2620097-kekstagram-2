const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
const picturesContainer = document.querySelector('.pictures');

const renderThumbnails = (photos) => {
  const fragment = document.createDocumentFragment();

  photos.forEach((photo) => {
    const pictureElement = pictureTemplate.cloneNode(true);
    const imgElement = pictureElement.querySelector('.picture__img');
    const commentsElement = pictureElement.querySelector('.picture__comments');
    const likesElement = pictureElement.querySelector('.picture__likes');

    imgElement.src = photo.url;
    imgElement.alt = photo.description;
    commentsElement.textContent = photo.comments.length;
    likesElement.textContent = photo.likes;

    fragment.append(pictureElement);
  });

  picturesContainer.append(fragment);
};

export { renderThumbnails };

