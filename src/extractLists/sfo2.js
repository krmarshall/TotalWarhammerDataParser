const sfo2DbList = [
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
];

const sfo2LocList = [
  '#SFO_character_skills',
  '#SFO_effects__',
  'jmw_norsca_navy_effects',
  'twh_emp_effects__',
  'zar_sk_effects__',
  '#SFO_ancillaries__',
  'zar_emp_ancillaries__',
  'zar_sk_ancillaries__',
  '#SFO_unit_attributes__',
  '#SFO_unit_abilities_additional_ui_effects__',
  '#SFO_unit_unit_abilities',
  'jmw_norsca_navy_unit_abilities',
  '#SFO_ui_text_replacements__',
  'jmw_norsca_navy_ui_text_replacements',
];

const sfo2LocMap = {
  '#SFO_character_skills': 'character_skills',
  '#SFO_effects__': 'effects',
  jmw_norsca_navy_effects: 'effects',
  twh_emp_effects__: 'effects',
  zar_sk_effects__: 'effects',
  '#SFO_ancillaries__': 'ancillaries',
  zar_emp_ancillaries__: 'ancillaries',
  zar_sk_ancillaries__: 'ancillaries',
  '#SFO_unit_attributes__': 'unit_attributes',
  '#SFO_unit_abilities_additional_ui_effects__': 'unit_abilities_additional_ui_effects',
  '#SFO_unit_unit_abilities': 'unit_abilities',
  jmw_norsca_navy_unit_abilities: 'unit_abilities',
  '#SFO_ui_text_replacements__': 'ui_text_replacements',
  jmw_norsca_navy_ui_text_replacements: 'ui_text_replacements',
};

export { sfo2DbList, sfo2LocList, sfo2LocMap };
