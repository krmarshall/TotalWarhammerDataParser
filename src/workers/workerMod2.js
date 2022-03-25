import { workerData } from 'worker_threads';
import { extractPackfile, extractTsv } from '../rpfmFunctions.js';
import parseFiles from '../parseFiles.js';
import { stapleTables } from '../stapleTables.js';

const { folder, dbPackName, locPackName, dbList, locList, game } = workerData;

extractPackfile(folder, dbPackName, locPackName, dbList, locList, game)
  .then(() => extractTsv(folder, game))
  .then(() => parseFiles(folder))
  // .then(() => {
  //   mergeTables(folder);
  // })
  // .then(() => {
  //   stapleTables(folder);
  // })
  .catch((error) => {
    throw error;
  });
