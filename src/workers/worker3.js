import { workerData } from 'worker_threads';
import { extractPackfileMass, extractTsv } from '../extractTables.js';
import { parseFiles } from '../parseFiles.js';
import { stapleTables } from '../stapleTables.js';
import { workerImage, workerMod } from './workerExports.js';
import { artefacts3DbList, artefacts3LocList, artefacts3LocMap } from '../extractLists/artefacts3.js';
import { ensureDirSync } from 'fs-extra';

const { folder, dbPackName, locPackName, dbList, locList, game } = workerData;

ensureDirSync(`./extracted_files/${folder}/`);
extractPackfileMass(folder, dbPackName, locPackName, dbList, locList, game)
  .then(() => extractTsv(folder, game))
  .then(() => parseFiles(folder))
  .then(() => {
    workerImage(folder, [dbPackName], game);

    stapleTables(folder);

    // Mods are reliant on base game files to be merged into, so spool workers for them up after vanilla is parsed.
    workerMod(
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
