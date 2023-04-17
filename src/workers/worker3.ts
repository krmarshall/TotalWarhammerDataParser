import { workerData } from 'worker_threads';
import { ensureDirSync } from 'fs-extra';
import { WorkerDataInterface } from '../interfaces/WorkerDataInterfaces';
import { SchemaInterface } from '../interfaces/SchemaInterfaces';
import parseImages from '../parseImages';
import { extractPackfileMass } from '../extractTables';
import initializeGlobalData from '../utils/initializeGlobalData';
import csvParse from '../csvParse';
import generateTables from '../generateTables';
import processFactions from '../processTables/processFactions';

import schema from '../../bins/jsonSchemas/schema_wh3.json';

const { folder, dbPackName, locPackName, dbList, locList, game }: WorkerDataInterface = workerData;

const imagePacknames = ['data', 'data_1', 'data_2', 'data_3', 'data_bl', 'data_bm', 'data_sc', 'data_sf', 'data_tk', 'data_we', 'data_wp_'];

console.time(folder);

const globalData = initializeGlobalData(folder);

ensureDirSync(`./extracted_files/${folder}/`);
// Vanilla Packs are really big, parsing these in parallel for both game 2/3 needs ~32gb of ram.
// const imgPromise = parseImages(folder, imagePacknames, game, true, globalData);
// const tsvPromise = extractPackfileMass(folder, dbPackName, locPackName, dbList, locList, game);
// Promise.all([imgPromise, tsvPromise]);
parseImages(folder, imagePacknames, game, true, globalData)
  .then(() => extractPackfileMass(folder, dbPackName, locPackName, dbList, locList, game))
  .then(() => {
    csvParse(folder, false, globalData);
    const tables = generateTables(folder, globalData, dbList, schema as SchemaInterface);
    processFactions(folder, globalData, tables);
  })
  .then(() => {
    console.timeEnd(folder);
  })
  .catch((error) => {
    throw error;
  });
