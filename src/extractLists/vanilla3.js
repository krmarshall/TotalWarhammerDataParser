import { v2DbList, v2LocList } from './vanilla2.js';

const v3DbList = [...v2DbList, 'character_ancillary_quest_ui_details_tables', 'character_skills_to_level_reached_criterias_tables'];

const v3LocList = [...v2LocList];

export { v3DbList, v3LocList };
