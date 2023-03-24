import { Worker } from 'worker_threads';
import exportData from '../exportData.js';
import log from '../log.js';

const workerVanilla = (workerData) => {
  const { game } = workerData;
  console.time(`${game} total`);
  const workerScript = game === 'warhammer_2' ? './src/workers/worker2.js' : './src/workers/worker3.js';
  const workerVanilla = new Worker(workerScript, {
    workerData,
  });
  workerVanilla.on('error', (error) => {
    console.log(error);
  });
  workerVanilla.on('exit', () => {
    console.timeEnd(`${game} total`);
    if (game === 'warhammer_3') {
      exportData();
    }
  });
  return workerVanilla;
};

const workerMod = (workerData) => {
  const { folder } = workerData;
  console.time(folder);
  const workerMod = new Worker('./src/workers/workerMod.js', {
    workerData,
  });
  workerMod.on('error', (error) => {
    console.log(error);
    log(`${folder} failed`, 'red');
  });
  workerMod.on('exit', () => {
    console.timeEnd(folder);
  });
};

const workerModMulti = (workerData) => {
  const { folder } = workerData;
  console.time(folder);
  const workerModMulti = new Worker('./src/workers/workerModMulti.js', {
    workerData,
  });
  workerModMulti.on('error', (error) => {
    console.log(error);
    log(`${folder} failed`, 'red');
  });
  workerModMulti.on('exit', () => {
    console.timeEnd(folder);
  });
};

export { workerVanilla, workerMod, workerModMulti };
