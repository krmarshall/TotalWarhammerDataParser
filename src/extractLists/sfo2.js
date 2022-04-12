import { v2DbList } from './vanilla2.js';

const sfo2DbList = [...v2DbList];

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
  '#SFO_hero_agent_subtypes',
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
  '#SFO_hero_agent_subtypes': 'agent_subtypes',
};

export { sfo2DbList, sfo2LocList, sfo2LocMap };
