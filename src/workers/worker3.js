import { workerData } from 'worker_threads';
import { extractPackfile, extractTsv } from '../rpfmFunctions.js';
import parseFiles from '../parseFiles.js';
import { stapleTables3 } from '../stapleTables.js';

const { folder, dbPackName, locPackName, dbList, locList, game } = workerData;

extractPackfile(folder, dbPackName, locPackName, dbList, locList, game)
  .then(() => extractTsv(folder, game))
  .then(() => parseFiles(folder))
  .then(() => {
    stapleTables3(folder);
  })
  .catch((error) => {
    throw error;
  });
