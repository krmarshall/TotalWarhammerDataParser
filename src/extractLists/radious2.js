import { v2DbList } from './vanilla2.js';

const radious2DbList = [...v2DbList];

const radious2LocList = [
  // Part 1
  [],
  // Part 2
  ['!rad_loc_effects', 'a_effects__'],
  // Hordes Reborn
  ['!op3_loc_agents', '!op3_loc_ancillaries', '!op3_loc_effects', '!op3_loc_skills', '!op3_loc_unit_abilities_shared'],
];

const radious2LocMap = {
  // Part 1

  // Part 2
  '!rad_loc_effects': 'effects',
  a_effects__: 'effects',

  // Hordes Reborn
  '!op3_loc_agents': 'agent_subtypes',
  '!op3_loc_ancillaries': 'ancillaries',
  '!op3_loc_effects': 'effects',
  '!op3_loc_skills': 'character_skills',
  '!op3_loc_unit_abilities_shared': 'unit_abilities',
};

export { radious2DbList, radious2LocList, radious2LocMap };
