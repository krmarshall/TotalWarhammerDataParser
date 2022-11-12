import log from './log.js';

const overwriteMerge = (vanillaTable, moddedTables, sameProps) => {
  const mergedMap = {};
  vanillaTable.forEach((record) => {
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
  const mergedTable = mergedMapKeys.map((mapKey) => mergedMap[mapKey]);
  return mergedTable;
};

const mergeTablesIntoVanilla = (globalData, folder) => {
  const vanillaFolder = folder.includes('2') ? 'vanilla2' : 'vanilla3';
  const tableNameMap = folder.includes('2') ? tableNameMap2 : tableNameMap3;

  const vanillaKeys = Object.keys(globalData.parsedData[vanillaFolder].db);

  vanillaKeys.forEach((vanillaKey) => {
    const vanillaTable = globalData.parsedData[vanillaFolder].db[vanillaKey];
    if (globalData.extractedData[folder].db[vanillaKey] !== undefined) {
      const moddedKeys = Object.keys(globalData.extractedData[folder].db[vanillaKey]);
      const moddedTables = moddedKeys.map((moddedKey) => globalData.extractedData[folder].db[vanillaKey][moddedKey]);
      const mergedTable = overwriteMerge(vanillaTable, moddedTables, tableNameMap[vanillaKey]);
      globalData.parsedData[folder].db[vanillaKey] = mergedTable;
    } else {
      globalData.parsedData[folder].db[vanillaKey] = vanillaTable;
    }
  });
};

const mergeLocsIntoVanilla = (globalData, folder) => {
  const vanillaFolder = folder.includes('2') ? 'vanilla2' : 'vanilla3';
  const vanillaLoc = globalData.parsedData[vanillaFolder].text;
  const modLoc = globalData.extractedData[folder].text;

  const combinedLoc = { ...vanillaLoc, ...modLoc };

  globalData.parsedData[folder].text = combinedLoc;
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
  effect_bundles_tables: ['key'],
  effect_bundles_to_effects_junctions_tables: ['effect_bundle_key', 'effect_key'],

  // Techs
  technologies_tables: ['key'],
  technology_effects_junction_tables: ['technology', 'effect'],
  technology_node_links_tables: ['parent_key', 'child_key'],
  technology_node_sets_tables: ['key'],
  technology_nodes_tables: ['key'],
  technology_nodes_to_ancillaries_junctions_tables: ['technology_node', 'ancillary'],
  technology_required_building_levels_junctions_tables: ['technology', 'required_building_level'],
  technology_required_technology_junctions_tables: ['technology', 'required_technology'],
  technology_script_lock_reasons_tables: ['technology'],
  technology_ui_groups_tables: ['key'],
  technology_ui_groups_to_technology_nodes_junctions_tables: ['tech_ui_group'],
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
  character_skills_to_level_reached_criterias_tables: ['character_skill', 'character_level', 'upgrade_to_skill_level'],
  faction_starting_general_effects_tables: ['agent_subtype'],
  technology_ui_group_links_tables: ['parent_key', 'child_key'],
};

export { mergeTablesIntoVanilla, mergeLocsIntoVanilla };
