import { workerData } from 'worker_threads';
import { extractPackfileMass, extractTsv } from '../extractTables.js';
import { parseFiles } from '../parseFiles.js';
import { stapleTables } from '../stapleTables.js';
import { workerImage, workerMod, workerModMulti } from './workerExports.js';
import { sfo2DbList } from '../extractLists/sfo2.js';
import { radious2DbList } from '../extractLists/radious2.js';
import { ensureDirSync } from 'fs-extra';

const { folder, dbPackName, locPackName, dbList, locList, game } = workerData;

ensureDirSync(`./extracted_files/${folder}/`);
extractPackfileMass(folder, dbPackName, locPackName, dbList, locList, game)
  .then(() => extractTsv(folder, game))
  .then(() => parseFiles(folder, false))
  .then(() => {
    workerImage(folder, [dbPackName], game);

    stapleTables(folder);

    // Mods are reliant on base game files to be merged into, so spool workers for them up after vanilla is parsed.
    workerMod('sfo2', 'steel_faith_overhaul_2', 'steel_faith_overhaul_2', sfo2DbList, undefined, 'warhammer_2', false);
    workerModMulti(
      'radious2',
      ['radious_total_war_mod_part1', 'radious_total_war_mod_part2', '!sm_radious_hordes_reborn'],
      ['radious_total_war_mod_part1', 'radious_total_war_mod_part2', '!sm_radious_hordes_reborn'],
      radious2DbList,
      undefined,
      'warhammer_2',
      false
    );
  })
  .catch((error) => {
    throw error;
  });
