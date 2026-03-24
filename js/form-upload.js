/**
 * Модуль формы загрузки и редактирования изображения (ТЗ п. 1, 2, 3).
 * Открытие/закрытие формы, превью, масштаб, эффекты (noUiSlider),
 * хэштеги и комментарий (Pristine), отправка, сброс.
 */

const uploadInputElement = document.querySelector('.img-upload__input');
const uploadOverlayElement = document.querySelector('.img-upload__overlay');
const bodyElement = document.body;
const uploadFormElement = document.querySelector('.img-upload__form');
const uploadCancelButtonElement = document.querySelector('.img-upload__cancel');
const hashtagsInputElement = document.querySelector('.text__hashtags');
const descriptionInputElement = document.querySelector('.text__description');

const HASHTAG_MAX_COUNT = 5;
const HASHTAG_MAX_LENGTH = 20;
const COMMENT_MAX_LENGTH = 140;
const HASHTAG_REGEX = /^#[a-zа-яё0-9]+$/i;

let hashtagErrorMessage = '';

const pristine = new Pristine(uploadFormElement, {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'img-upload__field-wrapper--error',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'pristine-error'
});

const getHashtags = (value) => value
  .trim()
  .split(/\s+/)
  .filter((hashtag) => hashtag.length > 0);

const validateHashtagCount = (value) => getHashtags(value).length <= HASHTAG_MAX_COUNT;

const validateHashtagSeparatedBySpaces = (value) => getHashtags(value).every(
  (hashtag) => !hashtag.slice(1).includes('#')
);

const validateHashtagMaxLength = (value) => getHashtags(value)
  .every((hashtag) => hashtag.length <= HASHTAG_MAX_LENGTH);

const validateHashtagFormat = (value) => getHashtags(value)
  .every((hashtag) => HASHTAG_REGEX.test(hashtag));

const validateHashtagUnique = (value) => {
  const hashtags = getHashtags(value).map((hashtag) => hashtag.toLowerCase());
  return hashtags.length === new Set(hashtags).size;
};

const validateHashtags = (value) => {
  if (value.trim() === '') {
    return true;
  }

  if (!validateHashtagCount(value)) {
    hashtagErrorMessage = `Нельзя указать больше ${HASHTAG_MAX_COUNT} хэштегов`;
    return false;
  }

  if (!validateHashtagSeparatedBySpaces(value)) {
    hashtagErrorMessage = 'Хэштеги должны разделяться пробелами';
    return false;
  }

  if (!validateHashtagMaxLength(value)) {
    hashtagErrorMessage = `Максимальная длина одного хэштега — ${HASHTAG_MAX_LENGTH} символов, включая #`;
    return false;
  }

  if (!validateHashtagFormat(value)) {
    hashtagErrorMessage = 'Хэштег должен начинаться с # и содержать только буквы и цифры';
    return false;
  }

  if (!validateHashtagUnique(value)) {
    hashtagErrorMessage = 'Хэштеги не должны повторяться';
    return false;
  }

  return true;
};

const getHashtagErrorMessage = () => hashtagErrorMessage;

const validateCommentLength = (value) => value.length <= COMMENT_MAX_LENGTH;

pristine.addValidator(hashtagsInputElement, validateHashtags, getHashtagErrorMessage);
pristine.addValidator(
  descriptionInputElement,
  validateCommentLength,
  `Длина комментария не может быть больше ${COMMENT_MAX_LENGTH} символов`
);

const closeForm = () => {
  uploadOverlayElement.classList.add('hidden');
  bodyElement.classList.remove('modal-open');
  uploadFormElement.reset();
  pristine.reset();
  uploadInputElement.value = '';
};

const onUploadInputChange = () => {
  uploadOverlayElement.classList.remove('hidden');
  bodyElement.classList.add('modal-open');
};

const onUploadCancelButtonClick = (evt) => {
  evt.preventDefault();
  closeForm();
};

const onDocumentKeydown = (evt) => {
  const isUploadFormOpened = !uploadOverlayElement.classList.contains('hidden');
  const activeElement = document.activeElement;
  const isTextFieldFocused = activeElement === hashtagsInputElement || activeElement === descriptionInputElement;

  if (evt.key === 'Escape' && isUploadFormOpened && !isTextFieldFocused) {
    evt.preventDefault();
    closeForm();
  }
};

const onUploadFormSubmit = (evt) => {
  if (!pristine.validate()) {
    evt.preventDefault();
  }
};

const initFormUpload = () => {
  uploadInputElement.addEventListener('change', onUploadInputChange);
  uploadCancelButtonElement.addEventListener('click', onUploadCancelButtonClick);
  document.addEventListener('keydown', onDocumentKeydown);
  uploadFormElement.addEventListener('submit', onUploadFormSubmit);
};

export { initFormUpload };
