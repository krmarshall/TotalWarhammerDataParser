import { Worker } from 'worker_threads';
import { emptyDirSync } from 'fs-extra';
import { v2DbList, v2LocList } from './extractLists/vanilla2.js';

console.time('wh2 total');
console.time('wh3 total');

emptyDirSync('./extracted_files');
emptyDirSync('./parsed_files');
emptyDirSync('./output');

// Vanilla 2
const workerVanilla2 = new Worker('./src/workers/worker2.js', {
  workerData: {
    folder: 'vanilla2',
    dbPackName: 'data',
    locPackName: 'local_en',
    dbList: v2DbList,
    locList: v2LocList,
    game: 'warhammer_2',
  },
});
workerVanilla2.on('error', (error) => {
  console.log(error);
});
workerVanilla2.on('exit', () => {
  console.timeEnd('wh2 total');
});

// Vanilla 3
const workerVanilla3 = new Worker('./src/workers/worker3.js', {
  workerData: {
    folder: 'vanilla3',
    dbPackName: 'data',
    locPackName: 'local_en',
    dbList: v2DbList,
    locList: v2LocList,
    game: 'warhammer_3',
  },
});
workerVanilla3.on('error', (error) => {
  console.log(error);
});
workerVanilla3.on('exit', () => {
  console.timeEnd('wh3 total');
});
