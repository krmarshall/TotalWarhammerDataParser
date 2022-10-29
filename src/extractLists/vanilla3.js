import { v2DbList, v2LocList } from './vanilla2.js';

// If adding to this array be sure to add corresponding entry to the tableNameMap at the bottom of mergeTables.js

const v3DbList = [
  ...v2DbList,
  'character_ancillary_quest_ui_details_tables',
  'character_skills_to_level_reached_criterias_tables',
  'faction_starting_general_effects_tables',
];

const v3LocList = [...v2LocList];

export { v3DbList, v3LocList };
