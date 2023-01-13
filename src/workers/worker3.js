import { workerData } from 'worker_threads';
import { extractPackfileMass, extractTsv } from '../extractTables.js';
import { parseFiles } from '../parseFiles.js';
import { stapleTables } from '../stapleTables.js';
import { workerMod, workerModMulti } from './workerExports.js';
import { ensureDirSync } from 'fs-extra';
import { globalDataInit } from '../otherFunctions/index.js';
import { radious3DbList, radious3PackNames } from '../extractLists/radious3.js';
import { mixu3DbList, mixu3PackNames } from '../extractLists/mixu3.js';
import { lege3DbList } from '../extractLists/lege3.js';
import { crys3DbList } from '../extractLists/crys3.js';
import { scm3DbList, scm3ImgPackNames, scm3PackNames } from '../extractLists/scm3.js';
import parseImages from '../extractImages.js';

const { folder, dbPackName, locPackName, dbList, locList, game } = workerData;

const imagePacknames = ['data', 'data_1', 'data_2', 'data_3', 'data_bl', 'data_bm', 'data_sc', 'data_sf', 'data_tk', 'data_we', 'data_wp_'];

console.time(folder);
const globalData = globalDataInit(folder);

ensureDirSync(`./extracted_files/${folder}/`);
const imgPromise = parseImages(folder, imagePacknames, game, true, globalData);
extractPackfileMass(folder, dbPackName, locPackName, dbList, locList, game)
  .then(() => {
    const tsvPromise = extractTsv(folder, game);
    return Promise.all([imgPromise, tsvPromise]);
  })
  .then(() => {
    parseFiles(folder, false, globalData);

    // Unpruned Mods
    workerModMulti({
      globalData: globalData,
      folder: 'radious3',
      dbPackNames: radious3PackNames,
      locPackNames: radious3PackNames,
      imgPackNames: radious3PackNames,
      dbList: radious3DbList,
      locList: undefined,
      game: 'warhammer_3',
      prune: false,
      tech: true,
      customPruneList: undefined,
    });
    workerMod({
      globalData: globalData,
      folder: 'crys3',
      dbPackName: 'crys_leaders',
      locPackName: 'crys_leaders',
      dbList: crys3DbList,
      locList: undefined,
      game: 'warhammer_3',
      prune: false,
      tech: false,
      customPruneList: undefined,
    });

    // Pruned Mods
    workerModMulti({
      globalData: globalData,
      folder: 'mixu3',
      dbPackNames: mixu3PackNames,
      locPackNames: mixu3PackNames,
      imgPackNames: mixu3PackNames,
      dbList: mixu3DbList,
      locList: undefined,
      game: 'warhammer_3',
      prune: true,
      tech: false,
      customPruneList: undefined,
    });
    workerMod({
      globalData: globalData,
      folder: 'lege3',
      dbPackName: '!str_legendary',
      locPackName: '!str_legendary',
      dbList: lege3DbList,
      locList: undefined,
      game: 'warhammer_3',
      prune: true,
      tech: false,
      customPruneList: undefined,
    });
    workerModMulti({
      globalData: globalData,
      folder: 'scm3',
      dbPackNames: scm3PackNames,
      locPackNames: scm3PackNames,
      imgPackNames: scm3ImgPackNames,
      dbList: scm3DbList,
      locList: undefined,
      game: 'warhammer_3',
      prune: true,
      tech: false,
      customPruneList: undefined,
    });

    return stapleTables(globalData, folder, true, false, undefined);
  })
  .then(() => {
    console.timeEnd(folder);
  })
  .catch((error) => {
    throw error;
  });
