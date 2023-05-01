import { workerData } from 'worker_threads';
import { ensureDirSync } from 'fs-extra';
import { WorkerDataInterface } from '../interfaces/WorkerDataInterfaces';
import parseImages from '../parseImages';
import { extractPackfileMass } from '../extractTables';
import initializeGlobalData from '../utils/initializeGlobalData';
import csvParse from '../csvParse';
import generateTables from '../generateTables';
import processFactions from '../processTables/processFactions';
import { workerMod, workerModMulti } from './workerExports';
import {
  radious3PackNames,
  mixu3PackNames,
  mixu3PackNamesEnum,
  scm3PackNames,
  scm3PackNamesEnum,
} from '../lists/extractLists/modPackNames';

const { folder, dbPackName, locPackName, dbList, locList, game, schema, tech, pruneVanilla }: WorkerDataInterface = workerData;

const imagePacknames = ['data', 'data_1', 'data_2', 'data_3', 'data_bl', 'data_bm', 'data_sc', 'data_sf', 'data_tk', 'data_we', 'data_wp_'];

console.time(folder);

const globalData = initializeGlobalData(folder);

ensureDirSync(`./extracted_files/${folder}/`);
extractPackfileMass(folder, dbPackName as string, locPackName as string, dbList, locList, game)
  .then(() => parseImages(folder, imagePacknames, game, tech, globalData))
  .then(() => {
    csvParse(folder, false, globalData);

    // Unpruned Mods
    workerModMulti(radiousWorkerData);
    workerMod(sfoWorkerData);
    workerMod(crysWorkerData);
    // Pruned Mods
    workerModMulti(mixuWorkerData);
    workerMod(legeWorkerData);
    workerModMulti(scmWorkerData);

    const tables = generateTables(folder, globalData, dbList, schema);
    processFactions(folder, globalData, tables, pruneVanilla);
  })
  .then(() => {
    console.timeEnd(folder);
  })
  .catch((error) => {
    throw error;
  });

// Unpruned Mods
const radiousWorkerData = {
  globalData: globalData,
  folder: 'radious3',
  dbPackNames: radious3PackNames,
  locPackNames: radious3PackNames,
  dbList: dbList,
  locList: undefined,
  game: 'warhammer_3',
  schema: schema,
  pruneVanilla: false,
  tech: true,
  packNameEnum: undefined,
};

const sfoWorkerData = {
  globalData: globalData,
  folder: 'sfo3',
  dbPackName: 'sfo_grimhammer_3_main',
  locPackName: 'sfo_grimhammer_3_main',
  dbList: dbList,
  locList: undefined,
  game: 'warhammer_3',
  schema: schema,
  pruneVanilla: false,
  tech: true,
  packNameEnum: undefined,
};

const crysWorkerData = {
  globalData: globalData,
  folder: 'crys3',
  dbPackName: 'crys_leaders',
  locPackName: 'crys_leaders',
  dbList: dbList,
  locList: undefined,
  game: 'warhammer_3',
  schema: schema,
  pruneVanilla: false,
  tech: false,
  packNameEnum: undefined,
};

// Pruned Mods
const mixuWorkerData = {
  globalData: globalData,
  folder: 'mixu3',
  dbPackNames: mixu3PackNames,
  locPackNames: mixu3PackNames,
  dbList: dbList,
  locList: undefined,
  game: 'warhammer_3',
  schema: schema,
  pruneVanilla: true,
  tech: true,
  packNameEnum: mixu3PackNamesEnum,
};

const legeWorkerData = {
  globalData: globalData,
  folder: 'lege3',
  dbPackName: '!str_legendary',
  locPackName: '!str_legendary',
  dbList: dbList,
  locList: undefined,
  game: 'warhammer_3',
  schema: schema,
  pruneVanilla: true,
  tech: false,
  packNameEnum: undefined,
};

const scmWorkerData = {
  globalData: globalData,
  folder: 'scm3',
  dbPackNames: scm3PackNames,
  locPackNames: scm3PackNames,
  dbList: dbList,
  locList: undefined,
  game: 'warhammer_3',
  schema: schema,
  pruneVanilla: true,
  tech: true,
  packNameEnum: scm3PackNamesEnum,
};
