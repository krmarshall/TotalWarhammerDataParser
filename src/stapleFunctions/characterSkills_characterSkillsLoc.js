import { stringInterpolator } from '../otherFunctions/index.js';

// The localised_name and localised_description seem to be mostly accurate to the vanilla locs, might be more important for modded packs.
const characterSkills_characterSkillsLoc = (characterSkills, combinedLoc, missingTextReplacements) => {
  const stapledTable = characterSkills.map((characterSkill) => {
    const locName = combinedLoc[`character_skills_localised_name_${characterSkill.key}`];
    delete characterSkill.localised_name;
    characterSkill.name = locName ? stringInterpolator(locName, combinedLoc, missingTextReplacements) : '';

    const locDescription = combinedLoc[`character_skills_localised_description_${characterSkill.key}`];
    delete characterSkill.localised_description;
    characterSkill.description = locDescription ? stringInterpolator(locDescription, combinedLoc, missingTextReplacements) : '';

    return { ...characterSkill };
  });
  return stapledTable;
};

export default characterSkills_characterSkillsLoc;
