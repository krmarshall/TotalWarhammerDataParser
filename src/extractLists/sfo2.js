import { v2DbList } from './vanilla2.js';

const sfo2DbList = [...v2DbList];

// Old system for when rpfm chokes on tables, since sfo2 isnt being updated ive just renamed all the tables it choked on,
// this list is old and outdated, just here for reference
// const sfo2LocList = [
//   '#SFO_character_skills',
//   '#SFO_effects__',
//   'jmw_norsca_navy_effects',
//   'twh_emp_effects__',
//   'zar_sk_effects__',
//   '#SFO_ancillaries__',
//   'zar_emp_ancillaries__',
//   'zar_sk_ancillaries__',
//   '#SFO_unit_attributes__',
//   '#SFO_unit_abilities_additional_ui_effects__',
//   '#SFO_unit_unit_abilities',
//   'jmw_norsca_navy_unit_abilities',
//   '#SFO_ui_text_replacements__',
//   'jmw_norsca_navy_ui_text_replacements',
//   '#SFO_hero_agent_subtypes',
// ];

export { sfo2DbList };
