import { workerData } from 'worker_threads';
import { extractPackfileMulti, extractTsv } from '../extractTables.js';
import { parseFiles } from '../parseFiles.js';
import { mergeTablesIntoVanilla, mergeLocsIntoVanilla } from '../mergeTables.js';
import { stapleTables } from '../stapleTables.js';
import { ensureDirSync } from 'fs-extra';
import parseImages from '../extractImages.js';

const { globalData, folder, dbPackNames, locPackNames, imgPackNames, dbList, locList, game, prune, tech, customPruneList } = workerData;

ensureDirSync(`./extracted_files/${folder}/`);
const imgPromise = parseImages(folder, imgPackNames, game, tech, globalData);
extractPackfileMulti(folder, dbPackNames, locPackNames, dbList, locList, game)
  .then(() => {
    const tsvPromise = extractTsv(folder, game);
    return Promise.all([imgPromise, tsvPromise]);
  })
  .then(() => {
    parseFiles(folder, true, globalData);
    mergeTablesIntoVanilla(globalData, folder);
    mergeLocsIntoVanilla(globalData, folder);

    stapleTables(globalData, folder, tech, prune, customPruneList);
  })
  .catch((error) => {
    throw error;
  });
