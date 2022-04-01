import { workerData } from 'worker_threads';
import { extractPackfileMass, extractTsv } from '../extractTables.js';
import { parseFiles } from '../parseFiles.js';
import { stapleTables } from '../stapleTables.js';
import { workerImageFactory } from './workerFactories.js';

const { folder, dbPackName, locPackName, dbList, locList, game } = workerData;

console.time(`${folder} extract/parse`);
extractPackfileMass(folder, dbPackName, locPackName, dbList, locList, game)
  .then(() => extractTsv(folder, game))
  .then(() => parseFiles(folder))
  .then(() => {
    console.timeEnd(`${folder} extract/parse`);

    workerImageFactory(folder, dbPackName, game);

    console.time(`${folder} staple`);
    stapleTables(folder);
    console.timeEnd(`${folder} staple`);
  })
  .catch((error) => {
    throw error;
  });
