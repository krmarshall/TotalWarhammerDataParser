import { Worker } from 'worker_threads';
import { v2DbList, v2LocList } from './extractLists/vanilla2.js';

const workerVanilla2 = new Worker('./src/worker.js', {
  workerData: { folder: 'vanilla', dbPackName: 'data', locPackName: 'local_en', dbList: v2DbList, locList: v2LocList, game: 'warhammer_2' },
});
workerVanilla2.on('error', (error) => {
  console.log(error);
});

const workerVanilla3 = new Worker('./src/worker.js', {
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
