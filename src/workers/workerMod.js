import { workerData } from 'worker_threads';
import { extractPackfileMass, extractTsv } from '../extractTables.js';
import { parseFiles } from '../parseFiles.js';
import { mergeTablesIntoVanilla, mergeLocsIntoVanilla } from '../mergeTables.js';
import { stapleTables } from '../stapleTables.js';
import { workerImage } from './workerExports.js';
import { ensureDirSync } from 'fs-extra';
import pruneChars from '../pruneChars.js';

const { globalData, folder, dbPackName, locPackName, dbList, locList, game, prune } = workerData;

ensureDirSync(`./extracted_files/${folder}/`);
extractPackfileMass(folder, dbPackName, locPackName, dbList, locList, game)
  .then(() => extractTsv(folder, game))
  .then(() => {
    parseFiles(folder, true, globalData);
    mergeTablesIntoVanilla(globalData, folder);
    mergeLocsIntoVanilla(globalData, folder);
    workerImage(folder, [dbPackName], game);

    return stapleTables(globalData, folder);
  })
  .then(() => {
    if (prune) {
      pruneChars(folder);
    }
  })
  .catch((error) => {
    throw error;
  });
