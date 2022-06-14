import { v2DbList } from './vanilla2.js';

const mixu2DbList = [...v2DbList];

const mixu2LocList = [
  // ab_mixu_tabletop_lords
  [
    '!!_colleges_of_magic_ui_text_replacements',
    'ab_mixus_hero_pack_abilities__core',
    'ab_mixus_hero_pack_agent_subtypes',
    'ab_mixus_hero_pack_ancillaries',
    'ab_mixus_hero_pack_character_skills',
    'ab_mixus_hero_pack_effects',
  ],
  // !a_mixus_legendary_lords1
  [
    '!!!_mixu_le_huss_ui_text_replacements',
    'daith_crafting_ancillaries',
    'daith_crafting_effects',
    'daith_crafting_special_ability_phases',
    'daith_crafting_unit_abilities_additional_ui_effects',
    'mixu_le_huss_abilities__new',
    'mixu_le_huss_agent_subtypes',
    'mixu_le_huss_ancillaries__new',
    'mixu_le_huss_char_skills__new',
    'mixu_le_huss_effects__new',
    'mixu_le_huss_unit_abilities_additional_ui_effects__new',
  ],
  // ab_mixus_darkhand
  [
    'ab_kouran_darkhand_agent_subtypes',
    'ab_kouran_darkhand_ancillaries',
    'ab_kouran_darkhand_character_skills',
    'ab_kouran_darkhand_effects',
    'ab_kouran_darkhand_unit_abilities__',
    'ab_kouran_darkhand_unit_abilities_additional_ui_effects',
    'mixu_clan_mordkin_unit_abilities__',
    'mixu_ll2_ui_text_replacements__',
  ],
];

const mixu2LocMap = {
  // ab_mixu_tabletop_lords
  '!!_colleges_of_magic_ui_text_replacements': 'ui_text_replacements',
  ab_mixus_hero_pack_abilities__core: 'unit_abilities',
  ab_mixus_hero_pack_agent_subtypes: 'agent_subtypes',
  ab_mixus_hero_pack_ancillaries: 'ancillaries',
  ab_mixus_hero_pack_character_skills: 'character_skills',
  ab_mixus_hero_pack_effects: 'effects',

  // !a_mixus_legendary_lords1
  '!!!_mixu_le_huss_ui_text_replacements': 'ui_text_replacements',
  daith_crafting_ancillaries: 'ancillaries',
  daith_crafting_effects: 'effects',
  daith_crafting_special_ability_phases: 'unit_abilities', // They have a bunch of unit abilities loc keys in this table for some reason
  daith_crafting_unit_abilities_additional_ui_effects: 'unit_abilities_additional_ui_effects',
  mixu_le_huss_abilities__new: 'unit_abilities',
  mixu_le_huss_agent_subtypes: 'agent_subtypes',
  mixu_le_huss_ancillaries__new: 'ancillaries',
  mixu_le_huss_char_skills__new: 'character_skills',
  mixu_le_huss_effects__new: 'effects',
  mixu_le_huss_unit_abilities_additional_ui_effects__new: 'unit_abilities_additional_ui_effects',

  // ab_mixus_darkhand
  ab_kouran_darkhand_agent_subtypes: 'agent_subtypes',
  ab_kouran_darkhand_ancillaries: 'ancillaries',
  ab_kouran_darkhand_character_skills: 'character_skills',
  ab_kouran_darkhand_effects: 'effects',
  ab_kouran_darkhand_unit_abilities__: 'unit_abilities',
  ab_kouran_darkhand_unit_abilities_additional_ui_effects: 'unit_abilities_additional_ui_effects',
  mixu_clan_mordkin_unit_abilities__: 'unit_abilities',
  mixu_ll2_ui_text_replacements__: 'ui_text_replacements',
};

export { mixu2DbList, mixu2LocList, mixu2LocMap };
