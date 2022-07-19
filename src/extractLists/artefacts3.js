import { v3DbList } from './vanilla3.js';

const artefacts3DbList = [...v3DbList];

const artefacts3LocList = [
  '!!!stompies_items_ancillaries__',
  '!!!stompies_items_character_skills__',
  '!!!stompies_items_effects__',
  '!!!stompies_items_unit_abilities__',
  '!!!stompies_items_unit_abilities_additional_ui_effects__',
];

const artefacts3LocMap = {
  '!!!stompies_items_ancillaries__': 'ancillaries',
  '!!!stompies_items_character_skills__': 'character_skills',
  '!!!stompies_items_effects__': 'effects',
  '!!!stompies_items_unit_abilities__': 'unit_abilities',
  '!!!stompies_items_unit_abilities_additional_ui_effects__': 'unit_abilities_additional_ui_effects',
};

export { artefacts3DbList, artefacts3LocList, artefacts3LocMap };
