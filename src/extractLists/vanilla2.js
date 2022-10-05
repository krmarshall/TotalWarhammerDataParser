// If adding to this array be sure to add corresponding entry to the tableNameMap at the bottom of mergeTables.js

const v2DbList = [
  'ancillaries_tables',
  'ancillary_to_effects_tables',
  'character_skill_level_details_tables',
  'character_skill_level_to_ancillaries_junctions_tables',
  'character_skill_level_to_effects_junctions_tables',
  'character_skill_node_links_tables',
  'character_skill_node_sets_tables',
  'character_skill_nodes_skill_locks_tables',
  'character_skill_nodes_tables',
  'character_skills_tables',
  'character_skills_to_quest_ancillaries_tables',
  'cultures_subcultures_tables',
  'cultures_tables',
  'effect_bonus_value_unit_ability_junctions_tables',
  'effects_tables',
  'faction_agent_permitted_subtypes_tables',
  'factions_tables',
  'special_ability_phase_attribute_effects_tables',
  'special_ability_phase_stat_effects_tables',
  'special_ability_phases_tables',
  'special_ability_to_special_ability_phase_junctions_tables',
  'unit_abilities_additional_ui_effects_tables',
  'unit_abilities_tables',
  'unit_abilities_to_additional_ui_effects_juncs_tables',
  'unit_ability_types_tables',
  'unit_attributes_tables',
  'unit_special_abilities_tables',
  'ui_unit_stats_tables',
  'battle_vortexs_tables', // Not a type
  'projectile_bombardments_tables',
  'projectiles_tables',
  'projectiles_explosions_tables',
];

const v2LocList = [
  'ancillaries__',
  'character_skills__',
  'cultures__',
  'effects__',
  'unit_abilities__',
  'unit_abilities_additional_ui_effects__',
  'unit_ability_types__',
  'unit_attributes__',
  'unit_stat_localisations__',
  'ui_text_replacements__',
  'agent_subtypes__',
  'campaign_effect_scopes__',
];

export { v2DbList, v2LocList };
