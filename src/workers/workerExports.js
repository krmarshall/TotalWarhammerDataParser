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
    console.log(error);
  });
  workerVanilla.on('exit', () => {
    console.timeEnd(`${game} total`);
  });
  return workerVanilla;
};

const workerMod = (globalData, folder, dbPackName, locPackName, dbList, locList, game, prune, tech) => {
  console.time(`${folder} total`);
  const workerMod = new Worker('./src/workers/workerMod.js', {
    workerData: {
      globalData,
      folder,
      dbPackName,
      locPackName,
      dbList,
      locList,
      game,
      prune,
      tech,
    },
  });
  workerMod.on('error', (error) => {
    console.log(error);
    log(`${folder} failed`, 'red');
  });
  workerMod.on('exit', () => {
    console.timeEnd(`${folder} total`);
  });
};

const workerModMulti = (globalData, folder, dbPackNames, locPackNames, dbList, locList, game, prune, tech) => {
  console.time(`${folder} total`);
  const workerModMulti = new Worker('./src/workers/workerModMulti.js', {
    workerData: {
      globalData,
      folder,
      dbPackNames,
      locPackNames,
      dbList,
      locList,
      game,
      prune,
      tech,
    },
  });
  workerModMulti.on('error', (error) => {
    console.log(error);
    log(`${folder} failed`, 'red');
  });
  workerModMulti.on('exit', () => {
    console.timeEnd(`${folder} total`);
  });
};

const workerImage = (folder, dbPackNames, game) => {
  if (process.env.IMG === 'true') {
    const workerImage = new Worker('./src/workers/workerImage.js', {
      workerData: {
        folder,
        dbPackNames,
        game,
      },
    });
    workerImage.on('error', (error) => {
      console.log(error);
      log(`${folder} images failed`, 'red');
    });
    return workerImage;
  }
};

export { workerVanilla, workerMod, workerModMulti, workerImage };
