import { workerData } from 'worker_threads';
import { extractPackfileMass } from '../extractTables.js';
import { parseFiles } from '../parseFiles.js';
import { stapleTables } from '../stapleTables.js';
import { ensureDirSync } from 'fs-extra';
import { globalDataInit } from '../otherFunctions/index.js';
import parseImages from '../extractImages.js';

const { folder, dbPackName, locPackName, dbList, locList, game } = workerData;

console.time(folder);
const globalData = globalDataInit(folder);

ensureDirSync(`./extracted_files/${folder}/`);
// Vanilla Packs are really big, parsing these in parallel for both game 2/3 needs ~32gb of ram.
// const imgPromise = parseImages(folder, [dbPackName], game, true, globalData);
// const tsvPromise = extractPackfileMass(folder, dbPackName, locPackName, dbList, locList, game);
// Promise.all([imgPromise, tsvPromise]);
parseImages(folder, [dbPackName], game, true, globalData)
  .then(() => extractPackfileMass(folder, dbPackName, locPackName, dbList, locList, game))
  .then(() => {
    parseFiles(folder, false, globalData);

    // Unpruned mods

    return stapleTables(globalData, folder, true, false, undefined);
  })
  .then(() => {
    console.timeEnd(folder);
    // Pruned mods
  })
  .catch((error) => {
    throw error;
  });
