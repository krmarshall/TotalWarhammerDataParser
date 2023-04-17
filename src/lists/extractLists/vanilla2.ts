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
  'battle_vortexs_tables', // Not a typo
  'projectile_bombardments_tables',
  'projectiles_tables',
  'projectiles_explosions_tables',
  'special_ability_to_auto_deactivate_flags_tables',
  'special_ability_to_invalid_target_flags_tables',
  'unit_set_unit_ability_junctions_tables',
  'effect_bonus_value_unit_set_unit_ability_junctions_tables',
  'effect_bonus_value_military_force_ability_junctions_tables',
  'army_special_abilities_tables',
  'effect_bundles_tables',
  'effect_bundles_to_effects_junctions_tables',
  'ancillary_types_tables',
  'agent_subtypes_tables',
  'ancillary_info_tables',
  'banners_tables',

  // Techs
  'technologies_tables',
  'technology_effects_junction_tables',
  'technology_node_links_tables',
  'technology_node_sets_tables',
  'technology_nodes_tables',
  'technology_nodes_to_ancillaries_junctions_tables',
  'technology_required_building_levels_junctions_tables',
  'technology_required_technology_junctions_tables',
  'technology_script_lock_reasons_tables',
  'technology_ui_groups_tables',
  'technology_ui_groups_to_technology_nodes_junctions_tables',
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
  'special_ability_invalid_usage_flags__',
  'effect_bundles__',

  // Techs
  'technologies__',
  'technology_node_sets__',
  'technology_script_lock_reasons__',
  'technology_ui_groups__',
  'building_culture_variants__',
];

export { v2DbList, v2LocList };
