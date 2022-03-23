import { extractPackfile, extractTsv } from './rpfmFunctions.js';
import { parseVanillaFiles, parseVanilla3Files } from './parseFiles.js';
import { stapleTables, stapleTables3 } from './stapleTables.js';
import { v2DbList, v2LocList } from './extractLists/vanilla2.js';
import { sfo2DbList, sfo2LocList } from './extractLists/sfo2.js';

console.time('total');
// Vanilla 2
extractPackfile('vanilla', 'data', 'local_en', v2DbList, v2LocList, 'warhammer_2')
  .then(() => extractTsv('vanilla', 'warhammer_2'))
  .then(() => parseVanillaFiles())
  .then(() => {
    stapleTables('vanilla');
  })
  .catch((error) => {
    console.log(error);
  });

// Vanilla 3
extractPackfile('vanilla3', 'data', 'local_en', v2DbList, v2LocList, 'warhammer_3')
  .then(() => extractTsv('vanilla3', 'warhammer_3'))
  .then(() => parseVanilla3Files())
  .then(() => {
    stapleTables3('vanilla3');
  })
  .catch((error) => {
    console.log(error);
  });

// SFO 2
extractPackfile('sfo', 'steel_faith_overhaul_2', 'steel_faith_overhaul_2', sfo2DbList, sfo2LocList, 'warhammer_2')
  .then(() => extractTsv('sfo', 'warhammer_2'))
  .catch((error) => {
    console.log(error);
  });
