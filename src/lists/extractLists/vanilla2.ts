const v2DbList = [
  'ancillaries',
  'ancillary_to_effects',
  'character_skill_level_details',
  'character_skill_level_to_ancillaries_junctions',
  'character_skill_level_to_effects_junctions',
  'character_skill_node_links',
  'character_skill_node_sets',
  'character_skill_nodes_skill_locks',
  'character_skill_nodes',
  'character_skills',
  'character_skills_to_quest_ancillaries',
  'cultures_subcultures',
  'cultures',
  'effect_bonus_value_unit_ability_junctions',
  'effects',
  'faction_agent_permitted_subtypes',
  'factions',
  'special_ability_phase_attribute_effects',
  'special_ability_phase_stat_effects',
  'special_ability_phases',
  'special_ability_to_special_ability_phase_junctions',
  'unit_abilities_additional_ui_effects',
  'unit_abilities',
  'unit_abilities_to_additional_ui_effects_juncs',
  'unit_ability_types',
  'unit_attributes',
  'unit_special_abilities',
  'ui_unit_stats',
  'battle_vortexs',
  'projectile_bombardments',
  'projectiles',
  'projectiles_explosions',
  'special_ability_to_auto_deactivate_flags',
  'special_ability_to_invalid_target_flags',
  'special_ability_invalid_usage_flags',
  'unit_set_unit_ability_junctions',
  'effect_bonus_value_unit_set_unit_ability_junctions',
  'effect_bonus_value_military_force_ability_junctions',
  'army_special_abilities',
  'effect_bundles',
  'effect_bundles_to_effects_junctions',
  'ancillary_types',
  'agent_subtypes',
  'ancillary_info',
  'banners',
  'modifiable_unit_stats',
  'unit_stat_localisations',
  'campaign_effect_scopes',
  'main_units',
  'land_units',
  'battle_entities',
  'unit_shield_types',
  'unit_armour_types',
  'melee_weapons',
  'missile_weapons',
  'unit_attributes_groups',
  'unit_attributes_to_groups_junctions',
  'land_units_to_unit_abilites_junctions',
  'mounts',

  // Techs
  'technologies',
  'technology_effects_junction',
  'technology_node_links',
  'technology_node_sets',
  'technology_nodes',
  'technology_nodes_to_ancillaries_junctions',
  'technology_required_building_levels_junctions',
  'technology_required_technology_junctions',
  'technology_script_lock_reasons',
  'technology_ui_groups',
  'technology_ui_groups_to_technology_nodes_junctions',
  'building_levels',
  'building_culture_variants',
] as const;

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
  'land_units__',
  'special_ability_phases__',

  // Techs
  'technologies__',
  'technology_node_sets__',
  'technology_script_lock_reasons__',
  'technology_ui_groups__',
  'building_culture_variants__',
];

export { v2DbList, v2LocList };
