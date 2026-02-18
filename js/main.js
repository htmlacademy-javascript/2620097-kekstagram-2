const LIKES_MIN = 15;
const LIKES_MAX = 200;
const COMMENTS_MIN = 0;
const COMMENTS_MAX = 30;
const PHOTOS_COUNT = 25;
const AVATAR_COUNT = 6;
const COMMENT_MESSAGE_MIN = 1;
const COMMENT_MESSAGE_MAX = 2;

const COMMENT_MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const COMMENT_NAMES = [
  'Артём', 'Мария', 'Дмитрий', 'Анна', 'Иван', 'Елена',
  'Сергей', 'Ольга', 'Алексей', 'Наталья', 'Михаил', 'Татьяна'
];

const PHOTO_DESCRIPTIONS = [
  'Закат на море',
  'Утро в горах',
  'Прогулка по парку',
  'Кофе и книга',
  'Путешествие по городу',
  'Цветы в саду',
  'Дождливый день',
  'Семейный ужин',
  'Концерт под открытым небом',
  'Пляжный отдых',
  'Зимняя сказка',
  'Весенняя природа',
  'Архитектура старого города',
  'Летний пикник',
  'Ночной город',
  'Осенний лес',
  'Домашний уют',
  'Спортивный момент',
  'Музейный день',
  'Дружеская встреча',
  'Кулинарный эксперимент',
  'Прогулка с собакой',
  'Вид из окна',
  'Праздничный стол',
  'Момент счастья'
];

const getRandomInteger = (min, max) => {
  const lower = Math.ceil(Math.min(min, max));
  const upper = Math.floor(Math.max(min, max));
  return Math.floor(Math.random() * (upper - lower + 1)) + lower;
};

const getRandomArrayElement = (array) => array[getRandomInteger(0, array.length - 1)];

const getRandomComments = (count, getNextId) => {
  const comments = [];
  for (let i = 0; i < count; i++) {
    const messageCount = getRandomInteger(COMMENT_MESSAGE_MIN, COMMENT_MESSAGE_MAX);
    const messages = [];
    const usedIndices = new Set();
    while (messages.length < messageCount) {
      const index = getRandomInteger(0, COMMENT_MESSAGES.length - 1);
      if (!usedIndices.has(index)) {
        usedIndices.add(index);
        messages.push(COMMENT_MESSAGES[index]);
      }
    }
    comments.push({
      id: getNextId(),
      avatar: `img/avatar-${getRandomInteger(1, AVATAR_COUNT)}.svg`,
      message: messages.join(' '),
      name: getRandomArrayElement(COMMENT_NAMES)
    });
  }
  return comments;
};

const createPhoto = (id, getNextCommentId) => ({
  id,
  url: `photos/${id}.jpg`,
  description: PHOTO_DESCRIPTIONS[id - 1],
  likes: getRandomInteger(LIKES_MIN, LIKES_MAX),
  comments: getRandomComments(getRandomInteger(COMMENTS_MIN, COMMENTS_MAX), getNextCommentId)
});

const generatePhotos = () => {
  let nextCommentId = 1;
  const getNextCommentId = () => nextCommentId++;
  const result = [];
  for (let i = 1; i <= PHOTOS_COUNT; i++) {
    result.push(createPhoto(i, getNextCommentId));
  }
  return result;
};

// Массив для отрисовки галереи (будет использоваться в следующих задачах)
// eslint-disable-next-line no-unused-vars
const photos = generatePhotos();

// console.log(photos);
