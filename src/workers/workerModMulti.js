import { workerData } from 'worker_threads';
import { extractPackfileMulti, extractTsv } from '../extractTables.js';
import { parseFiles } from '../parseFiles.js';
import { mergeTablesMulti, mergeLocsIntoVanilla } from '../mergeTables.js';
import { stapleTables } from '../stapleTables.js';
import { workerImage } from './workerExports.js';
import { ensureDirSync } from 'fs-extra';
import pruneChars from '../pruneChars.js';

const { folder, dbPackNames, locPackNames, dbList, locList, game, prune } = workerData;

ensureDirSync(`./extracted_files/${folder}/`);
extractPackfileMulti(folder, dbPackNames, locPackNames, dbList, locList, game)
  .then(() => extractTsv(folder, game))
  .then(() => parseFiles(folder, true))
  .then(() => mergeTablesMulti(folder, dbList))
  .then(() => mergeLocsIntoVanilla(folder))
  .then(() => {
    workerImage(folder, dbPackNames, game);

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
