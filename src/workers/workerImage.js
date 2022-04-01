import { workerData } from 'worker_threads';
import { convertImages, extractImages } from '../extractImages.js';

const { folder, dbPackName, game } = workerData;

console.time(`${folder} images`);
extractImages(folder, dbPackName, game)
  .then(async () => {
    await convertImages(folder);
    console.timeEnd(`${folder} images`);
  })
  .catch((error) => {
    throw error;
  });
