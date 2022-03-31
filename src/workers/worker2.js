import { workerData, Worker } from 'worker_threads';
import { extractPackfileMass, extractTsv } from '../extractTables.js';
import { parseFiles } from '../parseFiles.js';
import { stapleTables } from '../stapleTables.js';

import { sfo2DbList, sfo2LocList, sfo2LocMap } from '../extractLists/sfo2.js';

const { folder, dbPackName, locPackName, dbList, locList, game } = workerData;

extractPackfileMass(folder, dbPackName, locPackName, dbList, locList, game)
  .then(() => extractTsv(folder, game))
  .then(() => parseFiles(folder))
  .then(() => {
    stapleTables(folder);

    // Mods are reliant on base game files to be merged into, so spool workers for them up after vanilla is parsed.
    // SFO 2
    const workerSFO2 = new Worker('./src/workers/workerMod2.js', {
      workerData: {
        folder: 'sfo2',
        dbPackName: 'steel_faith_overhaul_2',
        locPackName: 'steel_faith_overhaul_2',
        dbList: sfo2DbList,
        locList: sfo2LocList,
        locMap: sfo2LocMap,
        game: 'warhammer_2',
      },
    });
    workerSFO2.on('error', (error) => {
      throw error;
    });
  })
  .catch((error) => {
    throw error;
  });
