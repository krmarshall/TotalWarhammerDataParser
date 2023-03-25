import { workerData } from 'worker_threads';
import { extractPackfileMulti } from '../extractTables.js';
import { parseFiles } from '../parseFiles.js';
import { mergeTablesIntoVanilla, mergeLocsIntoVanilla } from '../mergeTables.js';
import { stapleTables } from '../stapleTables.js';
import { ensureDirSync } from 'fs-extra';
import parseImages from '../extractImages.js';
import output_compilationGroups from '../otherFunctions/output_compilationGroups.js';

const { globalData, folder, dbPackNames, locPackNames, imgPackNames, dbList, locList, game, prune, tech, customPruneList, packNameEnum } =
  workerData;

ensureDirSync(`./extracted_files/${folder}/`);
const imgPromise = parseImages(folder, imgPackNames, game, tech, globalData);
const tsvPromise = extractPackfileMulti(folder, dbPackNames, locPackNames, dbList, locList, game);
Promise.all([imgPromise, tsvPromise])
  .then(() => {
    if (packNameEnum !== undefined) {
      output_compilationGroups(folder, packNameEnum);
    }
    parseFiles(folder, true, globalData);
    mergeTablesIntoVanilla(globalData, folder);
    mergeLocsIntoVanilla(globalData, folder);

    return stapleTables(globalData, folder, tech, prune, customPruneList);
  })
  .catch((error) => {
    throw error;
  });
