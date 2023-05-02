import { v2DbList, v2LocList } from './vanilla2';

const v3DbList = [
  ...v2DbList,
  'character_ancillary_quest_ui_details',
  'character_skills_to_level_reached_criterias',
  'faction_starting_general_effects',
  'special_ability_spreadings',

  // Tech
  'technology_ui_group_links',
] as const;

const v3LocList = [...v2LocList];

export { v3DbList, v3LocList };
