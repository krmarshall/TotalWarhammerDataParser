import { workerData } from 'worker_threads';
import { extractPackfileMass, extractTsv } from '../extractTables.js';
import { parseMods } from '../parseFiles.js';
import { mergeTables, mergeLocs } from '../mergeTables.js';
import { stapleTables } from '../stapleTables.js';
import { workerImageFactory } from './workerFactories.js';

const { folder, dbPackName, locPackName, dbList, locList, locMap, game } = workerData;

extractPackfileMass(folder, dbPackName, locPackName, dbList, locList, game)
  .then(() => extractTsv(folder, game))
  .then(() => parseMods(folder))
  .then(() => mergeTables(folder, dbList, locList))
  .then(() => mergeLocs(folder, locList, locMap))
  .then(() => {
    workerImageFactory(folder, dbPackName, game);
    stapleTables(folder);
  })
  .catch((error) => {
    throw error;
  });
