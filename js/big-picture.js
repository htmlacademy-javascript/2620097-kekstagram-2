/**
 * Модуль полноразмерного просмотра фотографии (ТЗ п. 4.4–4.5, 4.6–4.8).
 * Открытие по данным фото, закрытие по Esc и кнопке.
 * Комментарии показываются по 5, кнопка «Загрузить ещё» подгружает следующие 5.
 */

const COMMENTS_STEP = 5;

const bigPictureElement = document.querySelector('.big-picture');
const bigPictureImg = bigPictureElement.querySelector('.big-picture__img img');
const likesCountElement = bigPictureElement.querySelector('.likes-count');
const commentShownCountElement = bigPictureElement.querySelector('.social__comment-shown-count');
const commentTotalCountElement = bigPictureElement.querySelector('.social__comment-total-count');
const socialCommentsElement = bigPictureElement.querySelector('.social__comments');
const socialCaptionElement = bigPictureElement.querySelector('.social__caption');
const commentsLoaderElement = bigPictureElement.querySelector('.comments-loader');
const cancelButtonElement = bigPictureElement.querySelector('.big-picture__cancel');

let onEscKeydown = null;
let onCancelClick = null;
let onCommentsLoaderClick = null;
let currentComments = [];
let shownCommentsCount = 0;

const createCommentElement = (comment) => {
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
  return li;
};

const updateCommentCounters = () => {
  commentShownCountElement.textContent = String(shownCommentsCount);
  commentTotalCountElement.textContent = String(currentComments.length);
  if (shownCommentsCount >= currentComments.length) {
    commentsLoaderElement.classList.add('hidden');
  } else {
    commentsLoaderElement.classList.remove('hidden');
  }
};

const closeBigPicture = () => {
  bigPictureElement.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onEscKeydown);
  cancelButtonElement.removeEventListener('click', onCancelClick);
  commentsLoaderElement.removeEventListener('click', onCommentsLoaderClick);
};

const openBigPicture = (photo) => {
  const comments = photo.comments || [];
  currentComments = comments;
  shownCommentsCount = Math.min(COMMENTS_STEP, comments.length);

  bigPictureImg.src = photo.url;
  bigPictureImg.alt = photo.description || '';
  likesCountElement.textContent = photo.likes;
  socialCaptionElement.textContent = photo.description || '';

  while (socialCommentsElement.firstChild) {
    socialCommentsElement.removeChild(socialCommentsElement.firstChild);
  }
  for (let i = 0; i < shownCommentsCount; i++) {
    socialCommentsElement.appendChild(createCommentElement(comments[i]));
  }
  updateCommentCounters();

  bigPictureElement.classList.remove('hidden');
  document.body.classList.add('modal-open');

  onEscKeydown = (evt) => {
    if (evt.key === 'Escape') {
      closeBigPicture();
    }
  };
  onCancelClick = () => closeBigPicture();
  onCommentsLoaderClick = () => {
    const nextCount = Math.min(COMMENTS_STEP, currentComments.length - shownCommentsCount);
    for (let i = 0; i < nextCount; i++) {
      socialCommentsElement.appendChild(createCommentElement(currentComments[shownCommentsCount + i]));
    }
    shownCommentsCount += nextCount;
    updateCommentCounters();
  };

  document.addEventListener('keydown', onEscKeydown);
  cancelButtonElement.addEventListener('click', onCancelClick);
  commentsLoaderElement.addEventListener('click', onCommentsLoaderClick);
};

export { openBigPicture };
