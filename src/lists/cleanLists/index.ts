import CleanListInterface from '../../interfaces/CleanListsInterface';
import ancillaries_tables from './ancillaries';
import character_skill_level_details_tables from './characterSkillLevelDetails';
import character_skills_tables from './characterSkills';
import special_ability_phases_tables from './specialAbilityPhases';
import unit_abilities_tables from './unitAbilities';
import unit_special_abilities_tables from './unitSpecialAbilities';

const cleanLists: { [key: string]: CleanListInterface } = {
  ancillaries_tables,
  character_skill_level_details_tables,
  character_skills_tables,
  special_ability_phases_tables,
  unit_abilities_tables,
  unit_special_abilities_tables,
};

export default cleanLists;
