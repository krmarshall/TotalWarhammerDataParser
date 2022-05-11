import { workerData } from 'worker_threads';
import { extractPackfileMass, extractTsv } from '../extractTables.js';
import { parseFiles } from '../parseFiles.js';
import { stapleTables } from '../stapleTables.js';
import { workerImageFactory, workerModFactory } from './workerFactories.js';
import { artefacts3DbList, artefacts3LocList, artefacts3LocMap } from '../extractLists/artefacts3.js';

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
    workerModFactory(
      'artefacts3',
      'stompies_new_artefacts',
      'stompies_new_artefacts',
      artefacts3DbList,
      artefacts3LocList,
      artefacts3LocMap,
      'warhammer_3'
    );
  })
  .catch((error) => {
    throw error;
  });
