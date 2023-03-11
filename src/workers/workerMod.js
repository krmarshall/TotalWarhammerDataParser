import { workerData } from 'worker_threads';
import { extractPackfileMass } from '../extractTables.js';
import { parseFiles } from '../parseFiles.js';
import { mergeTablesIntoVanilla, mergeLocsIntoVanilla } from '../mergeTables.js';
import { stapleTables } from '../stapleTables.js';
import { ensureDirSync } from 'fs-extra';
import parseImages from '../extractImages.js';

const { globalData, folder, dbPackName, locPackName, dbList, locList, game, prune, tech, customPruneList } = workerData;

ensureDirSync(`./extracted_files/${folder}/`);
const imgPromise = parseImages(folder, [dbPackName], game, tech, globalData);
const tsvPromise = extractPackfileMass(folder, dbPackName, locPackName, dbList, locList, game);
Promise.all([imgPromise, tsvPromise])
  .then(() => {
    parseFiles(folder, true, globalData);
    mergeTablesIntoVanilla(globalData, folder);
    mergeLocsIntoVanilla(globalData, folder);

    stapleTables(globalData, folder, tech, prune, customPruneList);
  })
  .catch((error) => {
    throw error;
  });
