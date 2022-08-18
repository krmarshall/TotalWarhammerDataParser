import { workerData } from 'worker_threads';
import { extractPackfileMass, extractTsv } from '../extractTables.js';
import { parseFiles } from '../parseFiles.js';
import { stapleTables } from '../stapleTables.js';
import { workerImage, workerModMulti } from './workerExports.js';
import { ensureDirSync } from 'fs-extra';
import { radious3DbList, radious3LocList, radious3LocMap } from '../extractLists/radious3.js';

const { folder, dbPackName, locPackName, dbList, locList, game } = workerData;

ensureDirSync(`./extracted_files/${folder}/`);
extractPackfileMass(folder, dbPackName, locPackName, dbList, locList, game)
  .then(() => extractTsv(folder, game))
  .then(() => parseFiles(folder))
  .then(() => {
    workerImage(folder, [dbPackName], game);

    stapleTables(folder);

    // Mods are reliant on base game files to be merged into, so spool workers for them up after vanilla is parsed.
    workerModMulti(
      'radious3',
      ['Radious_WH3_Mod_Part1', 'Radious_WH3_Mod_Part2', 'Radious_WH3_Mod_Part3', 'Radious_WH3_Mod_Part4'],
      ['Radious_WH3_Mod_Part1', 'Radious_WH3_Mod_Part2', 'Radious_WH3_Mod_Part3', 'Radious_WH3_Mod_Part4'],
      radious3DbList,
      radious3LocList,
      radious3LocMap,
      'warhammer_3'
    );
  })
  .catch((error) => {
    throw error;
  });
