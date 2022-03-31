import { workerData } from 'worker_threads';
import { convertImages, extractImages } from '../extractImages.js';

const { folder, dbPackName, game } = workerData;

extractImages(folder, dbPackName, game)
  .then(() => convertImages(folder))
  .catch((error) => {
    throw error;
  });
