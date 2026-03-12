/**
 * Точка входа приложения Кекстаграм.
 * Связывает модули и запускает необходимую инициализацию.
 */

import { generatePhotos } from './data.js';
import { renderThumbnails } from './thumbnails.js';

const photos = generatePhotos();

renderThumbnails(photos);
