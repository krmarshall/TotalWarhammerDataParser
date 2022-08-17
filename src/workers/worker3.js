import { workerData } from 'worker_threads';
import { extractPackfileMass, extractTsv } from '../extractTables.js';
import { parseFiles } from '../parseFiles.js';
import { stapleTables } from '../stapleTables.js';
import { workerImage } from './workerExports.js';
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
  })
  .catch((error) => {
    throw error;
  });
