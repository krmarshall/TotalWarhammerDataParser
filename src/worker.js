import { workerData } from 'worker_threads';
import { extractPackfile, extractTsv } from './rpfmFunctions.js';
import { parseVanillaFiles, parseVanilla3Files } from './parseFiles.js';
import { stapleTables, stapleTables3 } from './stapleTables.js';

const { folder, dbPackName, locPackName, dbList, locList, game } = workerData;

extractPackfile(folder, dbPackName, locPackName, dbList, locList, game)
  .then(() => extractTsv(folder, game))
  .then(() => {
    if (game === 'warhammer_2') {
      return parseVanillaFiles();
    } else if (game === 'warhammer_3') {
      return parseVanilla3Files();
    }
  })
  .then(() => {
    if (game === 'warhammer_2') {
      stapleTables('vanilla');
    } else if (game === 'warhammer_3') {
      stapleTables3('vanilla3');
    }
  })
  .catch((error) => {
    console.log(error);
  });
