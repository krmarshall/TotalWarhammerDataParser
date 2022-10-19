import fg from 'fast-glob';
import fse from 'fs-extra';
import log from './log.js';

import { assertTables } from './otherFunctions/index.js';

const spaces = process.env.NODE_ENV === 'production' ? 0 : 2;

const getVanillaJson = (tablePath, folder, loc) => {
  const game = folder.includes('2') ? 'vanilla2' : 'vanilla3';
  let vanillaJson;
  if (loc) {
    vanillaJson = fse.readJSONSync(`./parsed_files/${game}/text/db/combinedLoc.json`);
  } else {
    const splitDirs = tablePath.split('/');
    const tableName = splitDirs[splitDirs.length - 2];
    vanillaJson = fse.readJSONSync(`./parsed_files/${game}/db/${tableName}.json`);
  }
  return vanillaJson;
};

const overwriteMerge = (vanillaJson, moddedTables, sameProps) => {
  const mergedMap = {};
  vanillaJson.forEach((record) => {
    const recordKey = sameProps.reduce((prev, next) => prev + record[next], '');
    if (mergedMap[recordKey] === undefined) {
      mergedMap[recordKey] = record;
    } else {
      log(`mergeTables conflict: ${recordKey}`, 'red');
    }
  });

  moddedTables.forEach((modTable) => {
    modTable.forEach((modRecord) => {
      const recordKey = sameProps.reduce((prev, next) => prev + modRecord[next], '');
      mergedMap[recordKey] = modRecord;
    });
  });

  const mergedMapKeys = Object.keys(mergedMap);
  const mergedTable = mergedMapKeys.map((mapKey) => {
    return mergedMap[mapKey];
  });
  return mergedTable;
};

const mergeTablesIntoVanilla = (folder, dbList, locList) => {
  return new Promise((resolve, reject) => {
    const tableNameMap = folder.includes('2') ? tableNameMap2 : tableNameMap3;

    const tableDirs = dbList.map((table) => {
      return `./extracted_files/${folder}/db/${table}/`;
    });
    const tablePromises = tableDirs.map((tablePath) => {
      return new Promise((resolveI) => {
        const modJsonPaths = fg.sync(`${tablePath}**/*.json`, { onlyFiles: true });
        const vanillaJson = getVanillaJson(tablePath, folder, false);
        const moddedTables = modJsonPaths.map((modJsonPath) => {
          return fse.readJSONSync(modJsonPath);
        });
        const splitDirs = tablePath.split('/');
        const tableName = splitDirs[splitDirs.length - 2];
        const mergedTable = overwriteMerge(vanillaJson, moddedTables, tableNameMap[tableName]);

        fse.outputJSONSync(`./parsed_files/${folder}/db/${tableName}.json`, mergedTable, { spaces });
        resolveI();
      });
    });
    Promise.all(tablePromises)
      .then(() => {
        const missingTables = assertTables(folder, dbList, locList);
        if (missingTables.length > 0) {
          const vanillaFolder = folder.includes('2') ? 'vanilla2' : 'vanilla3';
          missingTables.forEach((missingTable) => {
            fse.copySync(`./parsed_files/${vanillaFolder}/db/${missingTable}.json`, `./parsed_files/${folder}/db/${missingTable}.json`, {
              errorOnExist: true,
            });
          });
        }
        resolve();
      })
      .catch((error) => {
        reject(error);
      });
  });
};

const mergeLocsIntoVanilla = (folder) => {
  return new Promise((resolve) => {
    const vanillaLoc = getVanillaJson('', folder, true);
    const modLoc = fse.readJsonSync(`./parsed_files/${folder}/text/db/modLoc.json`);
    const combinedLoc = { ...vanillaLoc, ...modLoc };
    fse.outputJSONSync(`./parsed_files/${folder}/text/db/combinedLoc.json`, combinedLoc, { spaces });
    resolve();
  });
};

// For multi pack mods they are extracted out across subDB/subLOC, start with the vanilla table and merge in modded tables from each subfolder
const mergeTablesMulti = (folder, dbList) => {
  return new Promise((resolve, reject) => {
    const tableNameMap = folder.includes('2') ? tableNameMap2 : tableNameMap3;

    const tablePromises = dbList.map((table) => {
      return new Promise((resolveI) => {
        const vanillaJson = getVanillaJson(`./extracted_files/${folder}/db/${table}/`, folder, false);
        const subDBs = fg.sync(`./extracted_files/${folder}/subDB*/db/${table}/**.json`, { onlyFiles: true });
        if (subDBs.length === 0) {
          fse.outputJSONSync(`./parsed_files/${folder}/db/${table}.json`, vanillaJson, { spaces });
          resolveI();
          return;
        }
        const moddedTables = subDBs.map((subDBPath) => fse.readJSONSync(subDBPath));
        const mergedTable = overwriteMerge(vanillaJson, moddedTables, tableNameMap[table]);

        fse.outputJSONSync(`./parsed_files/${folder}/db/${table}.json`, mergedTable, { spaces });
        resolveI();
      });
    });

    Promise.all(tablePromises)
      .then(() => {
        resolve();
      })
      .catch((error) => {
        reject(error);
      });
  });
};

// RPFM highlights the tables key/composite key in yellow, im banking thats what the engine determines what overrides vanilla tables
const tableNameMap2 = {
  // WH2
  ancillaries_tables: ['key'],
  ancillary_to_effects_tables: ['ancillary', 'effect'],
  character_skill_level_details_tables: ['level', 'skill_key', 'faction_key', 'campaign_key', 'subculture_key'],
  character_skill_level_to_ancillaries_junctions_tables: ['skill', 'granted_ancillary', 'level'],
  character_skill_level_to_effects_junctions_tables: ['character_skill_key', 'level', 'effect_key'],
  character_skill_node_links_tables: ['parent_key', 'child_key'],
  character_skill_node_sets_tables: ['key'],
  character_skill_nodes_skill_locks_tables: ['character_skill_node', 'character_skill', 'level'],
  character_skill_nodes_tables: ['key'],
  character_skills_tables: ['key'],
  character_skills_to_quest_ancillaries_tables: ['skill', 'ancillary'],
  cultures_subcultures_tables: ['subculture'],
  cultures_tables: ['key'],
  effect_bonus_value_unit_ability_junctions_tables: ['effect', 'bonus_value_id', 'unit_ability'],
  effects_tables: ['effect'],
  faction_agent_permitted_subtypes_tables: ['faction', 'agent', 'subtype'],
  factions_tables: ['key'],
  special_ability_phase_attribute_effects_tables: ['phase', 'attribute'],
  special_ability_phase_stat_effects_tables: ['phase', 'stat'],
  special_ability_phases_tables: ['id'],
  special_ability_to_special_ability_phase_junctions_tables: ['special_ability', 'order'],
  ui_unit_stats_tables: ['key'],
  unit_abilities_additional_ui_effects_tables: ['key'],
  unit_abilities_tables: ['key'],
  unit_abilities_to_additional_ui_effects_juncs_tables: ['ability', 'effect'],
  unit_ability_types_tables: ['key'],
  unit_attributes_tables: ['key'],
  unit_special_abilities_tables: ['key'],
  battle_vortexs_tables: ['vortex_key'],
  projectile_bombardments_tables: ['bombardment_key'],
  projectiles_tables: ['key'],
  projectiles_explosions_tables: ['key'],
  special_ability_to_auto_deactivate_flags_tables: ['special_ability', 'deactivate_flag'],
  special_ability_to_invalid_target_flags_tables: ['special_ability', 'invalid_target'],
  unit_set_unit_ability_junctions_tables: ['key'],
  effect_bonus_value_unit_set_unit_ability_junctions_tables: ['effect', 'bonus_value_id', 'unit_set_ability'],
  effect_bonus_value_military_force_ability_junctions_tables: ['effect', 'bonus_value_id', 'force_ability'],
  army_special_abilities_tables: ['army_special_ability'],
};

const tableNameMap3 = {
  ...tableNameMap2,
  // WH2 Changed
  special_ability_to_special_ability_phase_junctions_tables: [
    'special_ability',
    'order',
    'target_self',
    'target_friends',
    'target_enemies',
  ],

  // WH3
  character_ancillary_quest_ui_details_tables: ['ancillary', 'agent_subtype'],
  // rpfm only shows skill_key as the PK, but think it needs to be skill_key and rank CP?
  character_skills_to_level_reached_criterias_tables: ['skill_key', 'rank'],
};

export { mergeTablesIntoVanilla, mergeLocsIntoVanilla, mergeTablesMulti };
