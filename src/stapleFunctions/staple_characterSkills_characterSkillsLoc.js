// The localised_name and localised_description seem to be mostly accurate to the vanilla locs, might be more important for modded packs.
const staple_characterSkills_characterSkillsLoc = (characterSkills, characterSkillsLoc) => {
  const stapledTable = characterSkills.map((characterSkill) => {
    const locName = characterSkillsLoc.find((characterSkillLoc) => {
      return characterSkillLoc.key === `character_skills_localised_name_${characterSkill.key}`;
    });
    delete characterSkill.localised_name;
    characterSkill.name = locName.text;

    const locDescription = characterSkillsLoc.find((characterSkillLoc) => {
      return characterSkillLoc.key === `character_skills_localised_description_${characterSkill.key}`;
    });
    delete characterSkill.localised_description;
    characterSkill.description = locDescription.text;

    return { ...characterSkill };
  });
  return stapledTable;
};

export default staple_characterSkills_characterSkillsLoc;
