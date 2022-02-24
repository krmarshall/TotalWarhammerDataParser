import { parseVanillaFiles } from './parseFiles.js';
import { stapleVanillaTables } from './stapleTables.js';

parseVanillaFiles()
  .then(() => {
    stapleVanillaTables();
  })
  .catch((error) => {
    console.log(error);
  });
