import { Worker } from 'worker_threads';

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

const workerMod = (folder, dbPackName, locPackName, dbList, locList, locMap, game) => {
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

const workerModMulti = (folder, dbPackNames, locPackNames, dbList, locList, locMap, game) => {
  console.time(`${folder} total`);
  const workerMod = new Worker('./src/workers/workerModMulti.js', {
    workerData: {
      folder,
      dbPackNames,
      locPackNames,
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

const workerImage = (folder, dbPackNames, game) => {
  const workerImage = new Worker('./src/workers/workerImage.js', {
    workerData: {
      folder,
      dbPackNames,
      game,
    },
  });
  workerImage.on('error', (error) => {
    throw error;
  });
  return workerImage;
};

export { workerVanilla, workerMod, workerModMulti, workerImage };
