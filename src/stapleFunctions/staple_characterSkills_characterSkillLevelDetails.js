import characterSkillsPrune from '../pruneLists/characterSkillsPrune.js';
import characterSkillLevelDetailsPrune from '../pruneLists/characterSkillLevelDetailsPrune.js';

const staple_characterSkills_characterSkillLevelDetails = (characterSkills, characterSkillLevelDetails) => {
  const stapledTable = characterSkills.map((characterSkill) => {
    characterSkillsPrune.forEach((prune) => {
      delete characterSkill[prune];
    });

    const relatedRecords = characterSkillLevelDetails.filter((record) => {
      return record.skill_key === characterSkill.key;
    });

    if (relatedRecords.length) {
      relatedRecords.forEach((relatedRecord) => {
        characterSkillLevelDetailsPrune.forEach((prune) => {
          delete relatedRecord[prune];
        });

        if (characterSkill.levels === undefined) {
          characterSkill.levels = [];
        }
        relatedRecord.unlocked_at_rank++;
        characterSkill.levels[relatedRecord.level - 1] = { ...relatedRecord };
        delete characterSkill.levels[relatedRecord.level - 1].level;
        delete characterSkill.levels[relatedRecord.level - 1].skill_key;
      });
    }
    // Convert string to bool, is a tad scuffed
    characterSkill.is_background_skill = JSON.parse(characterSkill.is_background_skill);

    return { ...characterSkill };
  });
  return stapledTable;
};

export default staple_characterSkills_characterSkillLevelDetails;
