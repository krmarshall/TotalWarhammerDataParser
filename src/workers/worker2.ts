import { workerData } from 'worker_threads';
import { ensureDirSync } from 'fs-extra';
import { WorkerDataInterface } from '../interfaces/WorkerDataInterfaces';
import parseImages from '../parseImages';
import { extractPackfileMass } from '../extractTables';
import initializeGlobalData from '../utils/initializeGlobalData';
import csvParse from '../csvParse';
import generateTables from '../generateTables';
import processFactions from '../processTables/processFactions';

const { folder, dbPackName, locPackName, dbList, locList, game, schema, tech, pruneVanilla }: WorkerDataInterface = workerData;

console.time(folder);

const globalData = initializeGlobalData(folder);

ensureDirSync(`./extracted_files/${folder}/`);
// Vanilla Packs are really big, parsing these in parallel for both game 2/3 needs ~32gb of ram.
// const imgPromise = parseImages(folder, imagePacknames, game, true, globalData);
// const tsvPromise = extractPackfileMass(folder, dbPackName, locPackName, dbList, locList, game);
// Promise.all([imgPromise, tsvPromise]);
parseImages(folder, [dbPackName as string], game, tech, globalData)
  .then(() => extractPackfileMass(folder, dbPackName as string, locPackName as string, dbList, locList, game))
  .then(() => {
    csvParse(folder, false, globalData);
    const tables = generateTables(folder, globalData, dbList, schema);
    processFactions(folder, globalData, tables, pruneVanilla);
  })
  .then(() => {
    console.timeEnd(folder);
  })
  .catch((error) => {
    throw error;
  });
