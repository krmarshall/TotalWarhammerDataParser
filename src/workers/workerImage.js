import { workerData } from 'worker_threads';
import { convertImages, extractImages } from '../extractImages.js';

const { folder, dbPackNames, game } = workerData;

extractImages(folder, dbPackNames, game)
  .then(async () => {
    await convertImages(folder);
  })
  .catch((error) => {
    throw error;
  });
