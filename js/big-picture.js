/**
 * Модуль полноразмерного просмотра фотографии (ТЗ п. 4.4–4.5).
 * Открытие по данным фото, закрытие по Esc и кнопке.
 */

const bigPictureElement = document.querySelector('.big-picture');
const bigPictureImg = bigPictureElement.querySelector('.big-picture__img img');
const likesCountElement = bigPictureElement.querySelector('.likes-count');
const commentShownCountElement = bigPictureElement.querySelector('.social__comment-shown-count');
const commentTotalCountElement = bigPictureElement.querySelector('.social__comment-total-count');
const socialCommentsElement = bigPictureElement.querySelector('.social__comments');
const socialCaptionElement = bigPictureElement.querySelector('.social__caption');
const socialCommentCountElement = bigPictureElement.querySelector('.social__comment-count');
const commentsLoaderElement = bigPictureElement.querySelector('.comments-loader');
const cancelButtonElement = bigPictureElement.querySelector('.big-picture__cancel');

let onEscKeydown = null;
let onCancelClick = null;

const renderComments = (comments) => {
  while (socialCommentsElement.firstChild) {
    socialCommentsElement.removeChild(socialCommentsElement.firstChild);
  }
  comments.forEach((comment) => {
    const li = document.createElement('li');
    li.className = 'social__comment';

    const img = document.createElement('img');
    img.className = 'social__picture';
    img.src = comment.avatar || '';
    img.alt = comment.name || '';
    img.width = 35;
    img.height = 35;

    const text = document.createElement('p');
    text.className = 'social__text';
    text.textContent = comment.message || '';

    li.appendChild(img);
    li.appendChild(text);
    socialCommentsElement.appendChild(li);
  });
};

const closeBigPicture = () => {
  bigPictureElement.classList.add('hidden');
  document.body.classList.remove('modal-open');
  socialCommentCountElement.classList.remove('hidden');
  commentsLoaderElement.classList.remove('hidden');
  document.removeEventListener('keydown', onEscKeydown);
  cancelButtonElement.removeEventListener('click', onCancelClick);
};

const openBigPicture = (photo) => {
  bigPictureImg.src = photo.url;
  bigPictureImg.alt = photo.description || '';
  likesCountElement.textContent = photo.likes;
  commentShownCountElement.textContent = String(photo.comments.length);
  commentTotalCountElement.textContent = String(photo.comments.length);
  socialCaptionElement.textContent = photo.description || '';
  renderComments(photo.comments || []);

  socialCommentCountElement.classList.add('hidden');
  commentsLoaderElement.classList.add('hidden');
  bigPictureElement.classList.remove('hidden');
  document.body.classList.add('modal-open');

  onEscKeydown = (evt) => {
    if (evt.key === 'Escape') {
      closeBigPicture();
    }
  };
  onCancelClick = () => closeBigPicture();

  document.addEventListener('keydown', onEscKeydown);
  cancelButtonElement.addEventListener('click', onCancelClick);
};

export { openBigPicture };
