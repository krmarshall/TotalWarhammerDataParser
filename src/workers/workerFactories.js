import { Worker } from 'worker_threads';

const workerVanillaFactory = (folder, dbPackName, locPackName, dbList, locList, game) => {
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

const workerModFactory = (folder, dbPackName, locPackName, dbList, locList, locMap, game) => {
  console.time(`${folder} total`);
  const workerMod = new Worker('./src/workers/workerMod.js', {
    workerData: {
      folder,
      dbPackName,
      locPackName,
      dbList,
      locList,
      locMap,
      game,
    },
  });
  workerMod.on('error', (error) => {
    throw error;
  });
  workerMod.on('exit', () => {
    console.timeEnd(`${folder} total`);
  });
};

const workerImageFactory = (folder, dbPackName, game) => {
  const workerImage = new Worker('./src/workers/workerImage.js', {
    workerData: {
      folder,
      dbPackName,
      game,
    },
  });
  workerImage.on('error', (error) => {
    throw error;
  });
  return workerImage;
};

export { workerVanillaFactory, workerModFactory, workerImageFactory };
