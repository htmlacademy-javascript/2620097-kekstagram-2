/**
 * Модуль галереи (ТЗ п. 4).
 * Связывает отрисовку миниатюр и полноэкранный просмотр через делегирование.
 */

import { renderThumbnails } from './thumbnails.js';
import { openBigPicture } from './big-picture.js';

const picturesContainerElement = document.querySelector('.pictures');

const onPicturesContainerClick = (photos) => (evt) => {
  const pictureElement = evt.target.closest('.picture');
  if (!pictureElement) {
    return;
  }
  evt.preventDefault();
  const index = parseInt(pictureElement.dataset.index, 10);
  if (Number.isNaN(index) || index < 0 || index >= photos.length) {
    return;
  }
  openBigPicture(photos[index]);
};

const initGallery = (photos) => {
  renderThumbnails(photos);
  picturesContainerElement.addEventListener('click', onPicturesContainerClick(photos));
};

export { initGallery };
