import extractModdedTsv from './extractModdedTsv.js';
import { parseVanillaFiles } from './parseFiles.js';
import stapleTables from './stapleTables.js';

console.time('extractSFO');
extractModdedTsv('sfo')
  .then(() => {
    console.timeEnd('extractSFO');

    console.time('parseVanilla');
    return parseVanillaFiles();
  })
  .then(() => {
    console.timeEnd('parseVanilla');

    console.time('stapleVanilla');
    stapleTables('vanilla');
    console.timeEnd('stapleVanilla');
  })
  .catch((error) => {
    console.log(error);
  });
