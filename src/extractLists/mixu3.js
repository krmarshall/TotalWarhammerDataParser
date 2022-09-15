import { v3DbList } from './vanilla3.js';

const mixu3DbList = [...v3DbList];

const mixu3LocList = [
  'ab_mixu_legendary_lords__agent_subtypes',
  'ab_mixu_legendary_lords__uitr',
  'mixu_legendary_lords__abilities',
  'mixu_legendary_lords__ancillaries',
  'mixu_legendary_lords__campaign_localised_strings',
  'mixu_legendary_lords__character_skills',
  'mixu_legendary_lords__effects',
  'mixu_legendary_lords__unit_abilities_additional_ui_effects',
];

const mixu3LocMap = {
  ab_mixu_legendary_lords__agent_subtypes: 'agent_subtypes',
  ab_mixu_legendary_lords__uitr: 'ui_text_replacements',
  mixu_legendary_lords__abilities: 'unit_abilities',
  mixu_legendary_lords__ancillaries: 'ancillaries',
  mixu_legendary_lords__campaign_localised_strings: 'ui_text_replacements',
  mixu_legendary_lords__character_skills: 'character_skills',
  mixu_legendary_lords__effects: 'effects',
  mixu_legendary_lords__unit_abilities_additional_ui_effects: 'unit_abilities_additional_ui_effects',
};

export { mixu3DbList, mixu3LocList, mixu3LocMap };
