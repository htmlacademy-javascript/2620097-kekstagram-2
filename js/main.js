/**
 * Точка входа приложения Кекстаграм.
 * Связывает модули и запускает необходимую инициализацию.
 */

import { generatePhotos } from './data.js';
import { initGallery } from './gallery.js';

const photos = generatePhotos();

initGallery(photos);
