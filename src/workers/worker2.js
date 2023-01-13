import { workerData } from 'worker_threads';
import { extractPackfileMass, extractTsv } from '../extractTables.js';
import { parseFiles } from '../parseFiles.js';
import { stapleTables } from '../stapleTables.js';
import { workerMod, workerModMulti } from './workerExports.js';
import { ensureDirSync } from 'fs-extra';
import { globalDataInit } from '../otherFunctions/index.js';
import { sfo2DbList } from '../extractLists/sfo2.js';
import { radious2DbList, radious2PackNames } from '../extractLists/radious2.js';
import parseImages from '../extractImages.js';

const { folder, dbPackName, locPackName, dbList, locList, game } = workerData;

console.time(folder);
const globalData = globalDataInit(folder);

ensureDirSync(`./extracted_files/${folder}/`);
const imgPromise = parseImages(folder, [dbPackName], game, true, globalData);
extractPackfileMass(folder, dbPackName, locPackName, dbList, locList, game)
  .then(() => {
    const tsvPromise = extractTsv(folder, game);
    return Promise.all([imgPromise, tsvPromise]);
  })
  .then(() => {
    parseFiles(folder, false, globalData);

    // Unpruned mods
    workerMod({
      globalData: globalData,
      folder: 'sfo2',
      dbPackName: 'steel_faith_overhaul_2',
      locPackName: 'steel_faith_overhaul_2',
      dbList: sfo2DbList,
      locList: undefined,
      game: 'warhammer_2',
      prune: false,
      tech: true,
      customPruneList: undefined,
    });
    workerModMulti({
      globalData: globalData,
      folder: 'radious2',
      dbPackNames: radious2PackNames,
      locPackNames: radious2PackNames,
      imgPackNames: radious2PackNames,
      dbList: radious2DbList,
      locList: undefined,
      game: 'warhammer_2',
      prune: false,
      tech: true,
      customPruneList: undefined,
    });

    return stapleTables(globalData, folder, true, false, undefined);
  })
  .then(() => {
    console.timeEnd(folder);
    // Pruned mods
  })
  .catch((error) => {
    throw error;
  });
