import { workerData } from 'worker_threads';
import { extractPackfileMass, extractTsv } from '../extractTables.js';
import { parseFiles } from '../parseFiles.js';
import { stapleTables } from '../stapleTables.js';
import { workerImageFactory, workerModFactory, workerModMultiFactory } from './workerFactories.js';
import { sfo2DbList, sfo2LocList, sfo2LocMap } from '../extractLists/sfo2.js';
import { artefacts2DbList, artefacts2LocList, artefacts2LocMap } from '../extractLists/artefacts2.js';
import { radious2DbList, radious2LocList, radious2LocMap } from '../extractLists/radious2.js';
// import { mixu2DbList, mixu2LocList, mixu2LocMap } from '../extractLists/mixu2.js';
import { ensureDirSync } from 'fs-extra';

const { folder, dbPackName, locPackName, dbList, locList, game } = workerData;

ensureDirSync(`./extracted_files/${folder}/`);
extractPackfileMass(folder, dbPackName, locPackName, dbList, locList, game)
  .then(() => extractTsv(folder, game))
  .then(() => parseFiles(folder))
  .then(() => {
    workerImageFactory(folder, [dbPackName], game);

    stapleTables(folder);

    // Mods are reliant on base game files to be merged into, so spool workers for them up after vanilla is parsed.
    workerModFactory('sfo2', 'steel_faith_overhaul_2', 'steel_faith_overhaul_2', sfo2DbList, sfo2LocList, sfo2LocMap, 'warhammer_2');
    workerModFactory(
      'artefacts2',
      'stompies_new_artefacts',
      'stompies_new_artefacts',
      artefacts2DbList,
      artefacts2LocList,
      artefacts2LocMap,
      'warhammer_2'
    );
    workerModMultiFactory(
      'radious2',
      ['radious_total_war_mod_part1', 'radious_total_war_mod_part2', '!sm_radious_hordes_reborn'],
      ['radious_total_war_mod_part1', 'radious_total_war_mod_part2', '!sm_radious_hordes_reborn'],
      radious2DbList,
      radious2LocList,
      radious2LocMap,
      'warhammer_2'
    );

    // Mixus mods dont add agents to factions through the standard faction_agent_permitted_subtypes table, so disabling
    // until I figure out a better option than hardcoding in that table.

    // workerModMultiFactory(
    //   'mixu2',
    //   ['ab_mixu_tabletop_lords', '!a_mixus_legendary_lords1', 'ab_mixus_darkhand'],
    //   ['ab_mixu_tabletop_lords', '!a_mixus_legendary_lords1', 'ab_mixus_darkhand'],
    //   mixu2DbList,
    //   mixu2LocList,
    //   mixu2LocMap,
    //   'warhammer_2'
    // );
  })
  .catch((error) => {
    throw error;
  });
