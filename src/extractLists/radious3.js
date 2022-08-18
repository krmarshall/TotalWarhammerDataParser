import { v3DbList } from './vanilla3.js';

const radious3DbList = [...v3DbList];

const radious3LocList = [
  // Part 1
  ['Rad_Loc_Unit_Abilities_Passives'],
  // Part 2
  ['!rad_loc_effects', 'a_effects__'],
  // Part 3
  ['Rad_Loc_Abilities', 'Rad_Loc_Agents', 'Rad_Loc_Ancillaries', 'Rad_Loc_Effects', 'Rad_Loc_Misc', 'Rad_Loc_Skills'],
  // Part 4
  [],
];

// Rad_Loc_Abilities has special_ability_phases_onscreen_name entries, might have to look into those
const radious3LocMap = {
  // Part 1
  Rad_Loc_Unit_Abilities_Passives: 'unit_abilities',
  // Part 2
  '!rad_loc_effects': 'effects',
  a_effects__: 'effects',
  // Part 3
  Rad_Loc_Abilities: 'unit_abilities',
  Rad_Loc_Agents: 'agent_subtypes',
  Rad_Loc_Ancillaries: 'ancillaries',
  Rad_Loc_Effects: 'effects',
  Rad_Loc_Misc: 'ui_text_replacements',
  Rad_Loc_Skills: 'character_skills',
  // Part 4
};

export { radious3DbList, radious3LocList, radious3LocMap };
