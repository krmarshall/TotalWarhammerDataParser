import glob from 'glob';
import { emptydirSync } from 'fs-extra';
import fse from 'fs-extra';

import { assertTables } from './otherFunctions/index.js';
import { v2LocList } from './extractLists/vanilla2.js';

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

const mergeTables = (folder, dbList, locList) => {
  console.time(`${folder} merge`);
  emptydirSync(`./parsed_files/${folder}/`);
  return new Promise((resolve, reject) => {
    const tableDirs = dbList.map((table) => {
      return `./extracted_files/${folder}/db/${table}/`;
    });
    const tablePromises = tableDirs.map((tablePath) => {
      return new Promise((resolveI, rejectI) => {
        const modJsonPaths = getJsonPaths(tablePath);
        const vanillaJson = getVanillaJson(tablePath, folder, false);
        const moddedTables = modJsonPaths.map((modJsonPath) => {
          return fse.readJSONSync(modJsonPath);
        });
        const splitDirs = tablePath.split('/');
        const tableName = splitDirs[splitDirs.length - 2];
        const mergedTable = overwriteMerge(vanillaJson, moddedTables, tableNameMap[tableName]);

        const spaces = process.env.production ? 0 : 2;
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
        console.timeEnd(`${folder} merge`);
        resolve();
      })
      .catch((error) => {
        console.timeEnd(`${folder} merge`);
        reject(error);
      });
  });
};

const mergeLocs = (folder, locList) => {
  console.time(`${folder} loc merge`);
  return new Promise((resolve, reject) => {
    const cleanedVanillaLocList = v2LocList.map((vanillaLoc) => {
      return vanillaLoc.replace('__', '');
    });
    const locPromises = cleanedVanillaLocList.map((vanillaLoc) => {
      return new Promise((resolveI, rejectI) => {
        const relatedModLocs = locList.filter((modLoc) => {
          return modLoc.includes(vanillaLoc);
        });
        const spaces = process.env.production ? 0 : 2;
        const vanillaLocJson = getVanillaJson(vanillaLoc, folder, true);
        if (relatedModLocs.length === 0) {
          fse.outputJSONSync(`./parsed_files/${folder}/text/db/${vanillaLoc}.json`, vanillaLocJson, { spaces });
          resolveI();
          return;
        }

        const moddedLocsJson = relatedModLocs.map((modLoc) => {
          return fse.readJsonSync(`./extracted_files/${folder}/text/db/${modLoc}.json`);
        });
        const mergedLoc = overwriteMerge(vanillaLocJson, moddedLocsJson, true);

        fse.outputJSONSync(`./parsed_files/${folder}/text/db/${vanillaLoc}.json`, mergedLoc, { spaces });
        resolveI();
      });
    });

    Promise.all(locPromises)
      .then(() => {
        console.timeEnd(`${folder} loc merge`);
        resolve();
      })
      .catch((error) => {
        console.timeEnd(`${folder} loc merge`);
        reject(error);
      });
  });
};

// RPFM highlights the tables key/composite key in yellow, im banking thats what the engine determines what overrides vanilla tables
const tableNameMap = {
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
  unit_abilities_additional_ui_effects_tables: ['key'],
  unit_abilities_tables: ['key'],
  unit_abilities_to_additional_ui_effects_juncs_tables: ['ability', 'effect'],
  unit_ability_types_tables: ['key'],
  unit_attributes_tables: ['key'],
  unit_special_abilities_tables: ['key'],
};

export { mergeTables, mergeLocs };
