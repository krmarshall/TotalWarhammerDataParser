import { workerData } from 'worker_threads';
import { extractPackfileMass } from '../extractTables.js';
import { parseFiles } from '../parseFiles.js';
import { stapleTables } from '../stapleTables.js';
// import { workerMod, workerModMulti } from './workerExports.js';
import { ensureDirSync } from 'fs-extra';
import { globalDataInit } from '../otherFunctions/index.js';
// import { sfo2DbList } from '../extractLists/sfo2.js';
// import { radious2DbList, radious2PackNames } from '../extractLists/radious2.js';
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
    // SFO2 Has a bunch of character skill node faction restrictions I dont want to hardcode around,
    // maintenance isn't worth the extremely little traffick game 2 mods get.
    // workerMod({
    //   globalData: globalData,
    //   folder: 'sfo2',
    //   dbPackName: 'steel_faith_overhaul_2',
    //   locPackName: 'steel_faith_overhaul_2',
    //   dbList: sfo2DbList,
    //   locList: undefined,
    //   game: 'warhammer_2',
    //   prune: false,
    //   tech: true,
    //   customPruneList: undefined,
    // });
    // workerModMulti({
    //   globalData: globalData,
    //   folder: 'radious2',
    //   dbPackNames: radious2PackNames,
    //   locPackNames: radious2PackNames,
    //   imgPackNames: radious2PackNames,
    //   dbList: radious2DbList,
    //   locList: undefined,
    //   game: 'warhammer_2',
    //   prune: false,
    //   tech: true,
    //   customPruneList: undefined,
    // });

    return stapleTables(globalData, folder, true, false, undefined);
  })
  .then(() => {
    console.timeEnd(folder);
    // Pruned mods
  })
  .catch((error) => {
    throw error;
  });
