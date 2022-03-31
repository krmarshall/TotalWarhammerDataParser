import { workerData } from 'worker_threads';
import { extractPackfileMass, extractTsv } from '../extractTables.js';
import { parseFiles } from '../parseFiles.js';
import { stapleTables } from '../stapleTables.js';
import { workerImageFactory } from './workerFactories.js';

const { folder, dbPackName, locPackName, dbList, locList, game } = workerData;

extractPackfileMass(folder, dbPackName, locPackName, dbList, locList, game)
  .then(() => extractTsv(folder, game))
  .then(() => parseFiles(folder))
  .then(() => {
    workerImageFactory(folder, dbPackName, game);
    stapleTables(folder);
  })
  .catch((error) => {
    throw error;
  });
