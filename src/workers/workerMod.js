import { workerData } from 'worker_threads';
import { extractPackfileMass, extractTsv } from '../extractTables.js';
import { parseMods } from '../parseFiles.js';
import { mergeTablesIntoVanilla, mergeLocsIntoVanilla } from '../mergeTables.js';
import { stapleTables } from '../stapleTables.js';
import { workerImage } from './workerExports.js';
import { ensureDirSync } from 'fs-extra';
import pruneChars from '../pruneChars.js';

const { folder, dbPackName, locPackName, dbList, locList, locMap, game, prune } = workerData;

ensureDirSync(`./extracted_files/${folder}/`);
extractPackfileMass(folder, dbPackName, locPackName, dbList, locList, game)
  .then(() => extractTsv(folder, game))
  .then(() => parseMods(folder))
  .then(() => mergeTablesIntoVanilla(folder, dbList, locList))
  .then(() => mergeLocsIntoVanilla(folder, locList, locMap))
  .then(() => {
    workerImage(folder, [dbPackName], game);

    return stapleTables(folder);
  })
  .then(() => {
    if (prune) {
      pruneChars(folder);
    }
  })
  .catch((error) => {
    throw error;
  });
