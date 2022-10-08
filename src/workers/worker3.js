import { workerData } from 'worker_threads';
import { extractPackfileMass, extractTsv } from '../extractTables.js';
import { parseFiles } from '../parseFiles.js';
import { stapleTables } from '../stapleTables.js';
import { workerImage, workerMod, workerModMulti } from './workerExports.js';
import { ensureDirSync } from 'fs-extra';
import { radious3DbList } from '../extractLists/radious3.js';
import { mixu3DbList } from '../extractLists/mixu3.js';

const { folder, dbPackName, locPackName, dbList, locList, game } = workerData;

const imagePacknames = ['data', 'data_1', 'data_2', 'data_3', 'data_bl', 'data_bm', 'data_sc', 'data_sf', 'data_tk', 'data_we', 'data_wp_'];

ensureDirSync(`./extracted_files/${folder}/`);
extractPackfileMass(folder, dbPackName, locPackName, dbList, locList, game)
  .then(() => extractTsv(folder, game))
  .then(() => parseFiles(folder, false))
  .then(() => {
    workerImage(folder, imagePacknames, game);

    // Mods we dont need to prune characters from can run before vanilla is finished
    workerModMulti(
      'radious3',
      ['Radious_WH3_Mod_Part1', 'Radious_WH3_Mod_Part2', 'Radious_WH3_Mod_Part3', 'Radious_WH3_Mod_Part4'],
      ['Radious_WH3_Mod_Part1', 'Radious_WH3_Mod_Part2', 'Radious_WH3_Mod_Part3', 'Radious_WH3_Mod_Part4'],
      radious3DbList,
      undefined,
      'warhammer_3',
      false
    );

    return stapleTables(folder);
  })
  .then(() => {
    // Mods that prune chars at the end need to wait
    workerMod('mixu3', 'ab_mixu_legendary_lords', 'ab_mixu_legendary_lords', mixu3DbList, undefined, 'warhammer_3', true);
  })
  .catch((error) => {
    throw error;
  });
