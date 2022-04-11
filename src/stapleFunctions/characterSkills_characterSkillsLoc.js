import { stringInterpolator } from '../otherFunctions/index.js';

// The localised_name and localised_description seem to be mostly accurate to the vanilla locs, might be more important for modded packs.
const characterSkills_characterSkillsLoc = (characterSkills, characterSkillsLoc, textReplacements, missingTextReplacements) => {
  const stapledTable = characterSkills.map((characterSkill) => {
    const locName = characterSkillsLoc.find((characterSkillLoc) => {
      return characterSkillLoc.key === `character_skills_localised_name_${characterSkill.key}`;
    });
    delete characterSkill.localised_name;
    characterSkill.name = locName?.text ? stringInterpolator(locName?.text, textReplacements, missingTextReplacements) : '';

    const locDescription = characterSkillsLoc.find((characterSkillLoc) => {
      return characterSkillLoc.key === `character_skills_localised_description_${characterSkill.key}`;
    });
    delete characterSkill.localised_description;
    characterSkill.description = locDescription?.text
      ? stringInterpolator(locDescription?.text, textReplacements, missingTextReplacements)
      : '';

    return { ...characterSkill };
  });
  return stapledTable;
};

export default characterSkills_characterSkillsLoc;
