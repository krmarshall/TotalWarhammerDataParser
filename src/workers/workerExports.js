import { Worker } from 'worker_threads';
import log from '../log.js';

const workerVanilla = (folder, dbPackName, locPackName, dbList, locList, game) => {
  console.time(`${game} total`);
  const workerScript = game === 'warhammer_2' ? './src/workers/worker2.js' : './src/workers/worker3.js';
  const workerVanilla = new Worker(workerScript, {
    workerData: {
      folder,
      dbPackName,
      locPackName,
      dbList,
      locList,
      game,
    },
  });
  workerVanilla.on('error', (error) => {
    log(error, 'red');
  });
  workerVanilla.on('exit', () => {
    console.timeEnd(`${game} total`);
  });
  return workerVanilla;
};

const workerMod = (folder, dbPackName, locPackName, dbList, locList, game, prune) => {
  console.time(`${folder} total`);
  const workerMod = new Worker('./src/workers/workerMod.js', {
    workerData: {
      folder,
      dbPackName,
      locPackName,
      dbList,
      locList,
      game,
      prune,
    },
  });
  workerMod.on('error', (error) => {
    log(error, 'red');
    log(`${folder} failed`, 'red');
  });
  workerMod.on('exit', () => {
    console.timeEnd(`${folder} total`);
  });
};

const workerModMulti = (folder, dbPackNames, locPackNames, dbList, locList, game, prune) => {
  console.time(`${folder} total`);
  const workerModMulti = new Worker('./src/workers/workerModMulti.js', {
    workerData: {
      folder,
      dbPackNames,
      locPackNames,
      dbList,
      locList,
      game,
      prune,
    },
  });
  workerModMulti.on('error', (error) => {
    log(error, 'red');
    log(`${folder} failed`, 'red');
  });
  workerModMulti.on('exit', () => {
    console.timeEnd(`${folder} total`);
  });
};

const workerImage = (folder, dbPackNames, game) => {
  const workerImage = new Worker('./src/workers/workerImage.js', {
    workerData: {
      folder,
      dbPackNames,
      game,
    },
  });
  workerImage.on('error', (error) => {
    log(error, 'red');
    log(`${folder} images failed`, 'red');
  });
  return workerImage;
};

export { workerVanilla, workerMod, workerModMulti, workerImage };
