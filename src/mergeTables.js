import glob from 'glob';
import fse from 'fs-extra';

import { assertTables } from './otherFunctions/index.js';
import { v2LocList } from './extractLists/vanilla2.js';
import { v3LocList } from './extractLists/vanilla3.js';

const spaces = process.env.NODE_ENV === 'production' ? 0 : 2;

const getJsonPaths = (src) => {
  return glob.sync(`${src}**/*.json`);
};

const getVanillaJson = (tablePath, folder, loc) => {
  const game = folder.includes('2') ? 'vanilla2' : 'vanilla3';
  let vanillaJson;
  if (loc) {
    vanillaJson = fse.readJSONSync(`./parsed_files/${game}/text/db/${tablePath}.json`);
  } else {
    const splitDirs = tablePath.split('/');
    const tableName = splitDirs[splitDirs.length - 2];
    vanillaJson = fse.readJSONSync(`./parsed_files/${game}/db/${tableName}.json`);
  }
  return vanillaJson;
};

const overwriteMerge = (vanillaJson, moddedTables, sameProps) => {
  const vanillaMerged = [...vanillaJson];
  moddedTables.forEach((modTable) => {
    modTable.forEach((modItem) => {
      let duplicateIndex;
      const duplicate = vanillaJson.find((vanillaItem, index) => {
        let samePropCount = 0;
        let hasDupes = true;
        // reduce sameProps with a short circuit
        for (let i = 0, n = sameProps.length; i < n && hasDupes === true; i++) {
          if (vanillaItem[sameProps[i]] === modItem[sameProps[i]]) {
            samePropCount++;
          } else {
            hasDupes = false;
          }
        }
        if (samePropCount === sameProps.length) {
          duplicateIndex = index;
          return true;
        }
        return false;
      });
      if (duplicate === undefined) {
        vanillaMerged.push(modItem);
      } else {
        vanillaMerged[duplicateIndex] = modItem;
      }
    });
  });
  return vanillaMerged;
};

const mergeTablesIntoVanilla = (folder, dbList, locList) => {
  return new Promise((resolve, reject) => {
    const tableDirs = dbList.map((table) => {
      return `./extracted_files/${folder}/db/${table}/`;
    });
    const tablePromises = tableDirs.map((tablePath) => {
      return new Promise((resolveI) => {
        const modJsonPaths = getJsonPaths(tablePath);
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

const mergeLocsIntoVanilla = (folder, locList, locMap) => {
  return new Promise((resolve, reject) => {
    const baseLocList = folder.includes('2') ? v2LocList : v3LocList;
    const cleanedVanillaLocList = baseLocList.map((vanillaLoc) => {
      return vanillaLoc.replace('__', '');
    });
    const locPromises = cleanedVanillaLocList.map((vanillaLoc) => {
      return new Promise((resolveI) => {
        const relatedModLocs = locList.filter((modLoc) => {
          return vanillaLoc === locMap[modLoc];
        });
        const vanillaLocJson = getVanillaJson(vanillaLoc, folder, true);
        if (relatedModLocs.length === 0) {
          fse.outputJSONSync(`./parsed_files/${folder}/text/db/${vanillaLoc}.json`, vanillaLocJson, { spaces });
          resolveI();
          return;
        }

        const moddedLocsJson = relatedModLocs.map((modLoc) => {
          return fse.readJsonSync(`./extracted_files/${folder}/text/db/${modLoc}.json`);
        });
        const mergedLoc = overwriteMerge(vanillaLocJson, moddedLocsJson, ['key']);

        fse.outputJSONSync(`./parsed_files/${folder}/text/db/${vanillaLoc}.json`, mergedLoc, { spaces });
        resolveI();
      });
    });

    Promise.all(locPromises)
      .then(() => {
        resolve();
      })
      .catch((error) => {
        reject(error);
      });
  });
};

// For multi pack mods they are extracted out across subDB/subLOC, start with the vanilla table and merge in modded tables from each subfolder
const mergeTablesMulti = (folder, dbList) => {
  return new Promise((resolve, reject) => {
    const tablePromises = dbList.map((table) => {
      return new Promise((resolveI) => {
        const vanillaJson = getVanillaJson(`./extracted_files/${folder}/db/${table}/`, folder, false);
        const subDBs = glob.sync(`./extracted_files/${folder}/subDB*/db/${table}/**.json`);
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

const mergeLocsMulti = (folder, locList, locMap) => {
  return new Promise((resolve, reject) => {
    const baseLocList = folder.includes('2') ? v2LocList : v3LocList;
    const cleanedVanillaLocList = baseLocList.map((vanillaLoc) => {
      return vanillaLoc.replace('__', '');
    });
    const locPromises = cleanedVanillaLocList.map((vanillaLoc) => {
      return new Promise((resolveI) => {
        const vanillaLocJson = getVanillaJson(vanillaLoc, folder, true);
        const allModLocs = [];
        locList.forEach((subLocList) => {
          allModLocs.push(...subLocList);
        });
        const relatedModLocs = allModLocs.filter((modLoc) => {
          return vanillaLoc === locMap[modLoc];
        });

        if (relatedModLocs.length === 0) {
          fse.outputJSONSync(`./parsed_files/${folder}/text/db/${vanillaLoc}.json`, vanillaLocJson, { spaces });
          resolveI();
          return;
        }
        const subDBs = [];
        relatedModLocs.forEach((relatedModLocPath) => {
          const modLocPaths = glob.sync(`./extracted_files/${folder}/subLOC*/text/db/${relatedModLocPath}.json`);
          subDBs.push(...modLocPaths);
        });
        const moddedLocsJson = subDBs.map((subDBPath) => fse.readJSONSync(subDBPath));
        const mergedLoc = overwriteMerge(vanillaLocJson, moddedLocsJson, ['key']);

        fse.outputJSONSync(`./parsed_files/${folder}/text/db/${vanillaLoc}.json`, mergedLoc, { spaces });
        resolveI();
      });
    });

    Promise.all(locPromises)
      .then(() => {
        resolve();
      })
      .catch((error) => {
        reject(error);
      });
  });
};

// RPFM highlights the tables key/composite key in yellow, im banking thats what the engine determines what overrides vanilla tables
const tableNameMap = {
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
  // WH3
  character_ancillary_quest_ui_details_tables: ['ancillary', 'agent_subtype'],
  character_skills_to_level_reached_criterias_tables: ['skill_key'],
};

export { mergeTablesIntoVanilla, mergeLocsIntoVanilla, mergeTablesMulti, mergeLocsMulti };
