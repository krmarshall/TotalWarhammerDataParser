import { workerData } from 'worker_threads';
import { convertImages, extractImages } from '../extractImages.js';

const { folder, dbPackNames, game, tech } = workerData;

extractImages(folder, dbPackNames, game, tech)
  .then(async () => {
    await convertImages(folder);
  })
  .catch((error) => {
    throw error;
  });
