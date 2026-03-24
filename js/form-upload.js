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
const scaleSmallerButtonElement = document.querySelector('.scale__control--smaller');
const scaleBiggerButtonElement = document.querySelector('.scale__control--bigger');
const scaleControlValueElement = document.querySelector('.scale__control--value');
const previewImgElement = document.querySelector('.img-upload__preview img');
const effectLevelContainerElement = document.querySelector('.img-upload__effect-level');
const effectSliderElement = document.querySelector('.effect-level__slider');
const effectValueElement = document.querySelector('.effect-level__value');
const effectRadioElements = document.querySelectorAll('.effects__radio');

const SCALE_STEP = 25;
const SCALE_MIN = 25;
const SCALE_MAX = 100;
const SCALE_DEFAULT = 100;

const EFFECT_SETTINGS = {
  chrome: {
    min: 0,
    max: 1,
    step: 0.1,
    resetValue: 1,
    getFilterStyle: (value) => `grayscale(${value})`,
  },
  sepia: {
    min: 0,
    max: 1,
    step: 0.1,
    resetValue: 1,
    getFilterStyle: (value) => `sepia(${value})`,
  },
  marvin: {
    min: 0,
    max: 100,
    step: 1,
    resetValue: 100,
    getFilterStyle: (value) => `invert(${value}%)`,
  },
  phobos: {
    min: 0,
    max: 3,
    step: 0.1,
    resetValue: 3,
    getFilterStyle: (value) => `blur(${value}px)`,
  },
  heat: {
    min: 1,
    max: 3,
    step: 0.1,
    resetValue: 3,
    getFilterStyle: (value) => `brightness(${value})`,
  },
};

let currentScale = SCALE_DEFAULT;

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

const updateScale = (nextScale) => {
  currentScale = Math.min(SCALE_MAX, Math.max(SCALE_MIN, nextScale));
  scaleControlValueElement.value = `${currentScale}%`;
  previewImgElement.style.transform = `scale(${currentScale / 100})`;
};

const resetScale = () => {
  currentScale = SCALE_DEFAULT;
  updateScale(SCALE_DEFAULT);
};

const onScaleSmallerClick = () => {
  updateScale(currentScale - SCALE_STEP);
};

const onScaleBiggerClick = () => {
  updateScale(currentScale + SCALE_STEP);
};

const getSliderNumericValue = () => {
  const raw = effectSliderElement.noUiSlider.get();
  const value = Array.isArray(raw) ? raw[0] : raw;
  return Number(value);
};

const syncEffectFromSlider = () => {
  const checkedRadio = document.querySelector('.effects__radio:checked');
  if (!checkedRadio || checkedRadio.value === 'none') {
    return;
  }
  const effectType = checkedRadio.value;
  const settings = EFFECT_SETTINGS[effectType];
  if (!settings) {
    return;
  }
  const value = getSliderNumericValue();
  effectValueElement.value = String(value);
  previewImgElement.style.filter = settings.getFilterStyle(value);
};

const onEffectSliderUpdate = () => {
  syncEffectFromSlider();
};

const onEffectRadioChange = (evt) => {
  const effectType = evt.target.value;
  if (effectType === 'none') {
    effectLevelContainerElement.classList.add('hidden');
    previewImgElement.style.removeProperty('filter');
    effectValueElement.value = '';
    return;
  }
  const settings = EFFECT_SETTINGS[effectType];
  effectLevelContainerElement.classList.remove('hidden');
  effectSliderElement.noUiSlider.updateOptions(
    {
      range: { min: settings.min, max: settings.max },
      step: settings.step,
      start: [settings.resetValue],
    },
    true
  );
};

const resetEffectUi = () => {
  effectLevelContainerElement.classList.add('hidden');
  previewImgElement.style.removeProperty('filter');
  effectValueElement.value = '';
  effectSliderElement.noUiSlider.updateOptions(
    {
      range: { min: EFFECT_SETTINGS.chrome.min, max: EFFECT_SETTINGS.chrome.max },
      step: EFFECT_SETTINGS.chrome.step,
      start: [EFFECT_SETTINGS.chrome.resetValue],
    },
    true
  );
};

const initEffectSlider = () => {
  noUiSlider.create(effectSliderElement, {
    range: { min: EFFECT_SETTINGS.chrome.min, max: EFFECT_SETTINGS.chrome.max },
    step: EFFECT_SETTINGS.chrome.step,
    start: [EFFECT_SETTINGS.chrome.resetValue],
    connect: 'lower',
  });
  effectSliderElement.noUiSlider.on('update', onEffectSliderUpdate);
};

const closeForm = () => {
  uploadOverlayElement.classList.add('hidden');
  bodyElement.classList.remove('modal-open');
  uploadFormElement.reset();
  pristine.reset();
  resetScale();
  resetEffectUi();
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
  initEffectSlider();
  scaleSmallerButtonElement.addEventListener('click', onScaleSmallerClick);
  scaleBiggerButtonElement.addEventListener('click', onScaleBiggerClick);
  effectRadioElements.forEach((radio) => {
    radio.addEventListener('change', onEffectRadioChange);
  });
  uploadInputElement.addEventListener('change', onUploadInputChange);
  uploadCancelButtonElement.addEventListener('click', onUploadCancelButtonClick);
  document.addEventListener('keydown', onDocumentKeydown);
  uploadFormElement.addEventListener('submit', onUploadFormSubmit);
};

export { initFormUpload };
