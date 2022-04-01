import { workerData } from 'worker_threads';
import { extractPackfileMass, extractTsv } from '../extractTables.js';
import { parseMods } from '../parseFiles.js';
import { mergeTables, mergeLocs } from '../mergeTables.js';
import { stapleTables } from '../stapleTables.js';
import { workerImageFactory } from './workerFactories.js';

const { folder, dbPackName, locPackName, dbList, locList, locMap, game } = workerData;

console.time(`${folder} extract/parse`);
extractPackfileMass(folder, dbPackName, locPackName, dbList, locList, game)
  .then(() => extractTsv(folder, game))
  .then(() => parseMods(folder))
  .then(() => {
    console.timeEnd(`${folder} extract/parse`);
    console.time(`${folder} merge`);
    return mergeTables(folder, dbList, locList);
  })
  .then(() => mergeLocs(folder, locList, locMap))
  .then(() => {
    console.timeEnd(`${folder} merge`);

    workerImageFactory(folder, dbPackName, game);

    console.time(`${folder} staple`);
    stapleTables(folder);
    console.timeEnd(`${folder} staple`);
  })
  .catch((error) => {
    throw error;
  });
