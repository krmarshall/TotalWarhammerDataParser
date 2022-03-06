import { parseVanillaFiles } from './parseFiles.js';
import stapleTables from './stapleTables.js';

console.time('parseVanilla');
parseVanillaFiles()
  .then(() => {
    console.timeEnd('parseVanilla');

    console.time('stapleVanilla');
    stapleTables('vanilla');
    console.timeEnd('stapleVanilla');
  })
  .catch((error) => {
    console.log(error);
  });
