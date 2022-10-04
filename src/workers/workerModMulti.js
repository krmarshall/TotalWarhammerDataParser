import { workerData } from 'worker_threads';
import { extractPackfileMulti, extractTsv } from '../extractTables.js';
import { parseMods } from '../parseFiles.js';
import { mergeTablesMulti, mergeLocsMulti } from '../mergeTables.js';
import { stapleTables } from '../stapleTables.js';
import { workerImage } from './workerExports.js';
import { ensureDirSync } from 'fs-extra';
import pruneChars from '../pruneChars.js';

const { folder, dbPackNames, locPackNames, dbList, locList, locMap, game, prune } = workerData;

ensureDirSync(`./extracted_files/${folder}/`);
extractPackfileMulti(folder, dbPackNames, locPackNames, dbList, locList, game)
  .then(() => extractTsv(folder, game))
  .then(() => parseMods(folder))
  .then(() => mergeTablesMulti(folder, dbList, locList))
  .then(() => mergeLocsMulti(folder, locList, locMap))
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
