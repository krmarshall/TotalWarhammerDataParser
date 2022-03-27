import { workerData } from 'worker_threads';
import { extractPackfileMass, extractTsv } from '../rpfmFunctions.js';
import { parseMods } from '../parseFiles.js';
import { mergeTables, mergeLocs } from '../mergeTables.js';
import { stapleTables } from '../stapleTables.js';

const { folder, dbPackName, locPackName, dbList, locList, game } = workerData;

extractPackfileMass(folder, dbPackName, locPackName, dbList, locList, game)
  .then(() => extractTsv(folder, game))
  .then(() => parseMods(folder))
  .then(() => mergeTables(folder, dbList, locList))
  .then(() => mergeLocs(folder, locList))
  .then(() => {
    stapleTables(folder);
  })
  .catch((error) => {
    throw error;
  });
