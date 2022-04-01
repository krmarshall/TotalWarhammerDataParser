import { workerData } from 'worker_threads';
import { extractPackfileMass, extractTsv } from '../extractTables.js';
import { parseFiles } from '../parseFiles.js';
import { stapleTables } from '../stapleTables.js';

import { sfo2DbList, sfo2LocList, sfo2LocMap } from '../extractLists/sfo2.js';
import { workerImageFactory, workerModFactory } from './workerFactories.js';

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

    // Mods are reliant on base game files to be merged into, so spool workers for them up after vanilla is parsed.
    workerModFactory('sfo2', 'steel_faith_overhaul_2', 'steel_faith_overhaul_2', sfo2DbList, sfo2LocList, sfo2LocMap, 'warhammer_2');
  })
  .catch((error) => {
    throw error;
  });
