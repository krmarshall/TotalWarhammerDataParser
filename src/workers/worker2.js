import { workerData } from 'worker_threads';
import { extractPackfileMass, extractTsv } from '../extractTables.js';
import { parseFiles } from '../parseFiles.js';
import { stapleTables } from '../stapleTables.js';
import { workerMod, workerModMulti, workerImage } from './workerExports.js';
import { ensureDirSync } from 'fs-extra';
import { globalDataInit } from '../otherFunctions/index.js';
import { sfo2DbList } from '../extractLists/sfo2.js';
import { radious2DbList } from '../extractLists/radious2.js';

const { folder, dbPackName, locPackName, dbList, locList, game } = workerData;

const globalData = globalDataInit(folder);

ensureDirSync(`./extracted_files/${folder}/`);
extractPackfileMass(folder, dbPackName, locPackName, dbList, locList, game)
  .then(() => extractTsv(folder, game))
  .then(() => {
    parseFiles(folder, false, globalData);

    workerImage(folder, [dbPackName], game);

    // Unpruned mods
    const radious2PackNames = ['radious_total_war_mod_part1', 'radious_total_war_mod_part2', '!sm_radious_hordes_reborn'];
    workerMod(globalData, 'sfo2', 'steel_faith_overhaul_2', 'steel_faith_overhaul_2', sfo2DbList, undefined, 'warhammer_2', false, true);
    workerModMulti(globalData, 'radious2', radious2PackNames, radious2PackNames, radious2DbList, undefined, 'warhammer_2', false, true);

    return stapleTables(globalData, folder, true);
  })
  .then(() => {
    // Pruned mods
  })
  .catch((error) => {
    throw error;
  });
