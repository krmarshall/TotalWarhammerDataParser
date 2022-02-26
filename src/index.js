import { parseVanillaFiles } from './parseFiles.js';
import { stapleVanillaTables } from './stapleTables.js';

console.time('parseVanilla');
parseVanillaFiles()
  .then(() => {
    console.timeEnd('parseVanilla');

    console.time('stapleVanilla');
    stapleVanillaTables();
    process.stdout.write('\n');
    console.timeEnd('stapleVanilla');
  })
  .catch((error) => {
    console.log(error);
  });
