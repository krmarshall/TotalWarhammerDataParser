const staple_characterSkills_characterSkillLevelToAncillariesJunction = (characterSkills, characterSkillLevelToAncillariesJunction) => {
  const stapledTable = characterSkills.map((characterSkill) => {
    const relatedAncillary = characterSkillLevelToAncillariesJunction.find((ancillary) => {
      return ancillary.skill === characterSkill.key;
    });
    if (relatedAncillary?.ancillary?.effects != undefined) {
      if (characterSkill.levels === undefined) {
        characterSkill.levels = [];
      }
      if (characterSkill.levels[relatedAncillary.level - 1] === undefined) {
        characterSkill.levels[relatedAncillary.level - 1] = {};
      }
      if (characterSkill.levels[relatedAncillary.level - 1].effects === undefined) {
        characterSkill.levels[relatedAncillary.level - 1].effects = [];
      }

      characterSkill.levels[relatedAncillary.level - 1].effects.forEach((charSkillEffect) => {
        relatedAncillary.ancillary.effects.forEach((ancillaryEffect, index) => {
          if (ancillaryEffect.priority === charSkillEffect.priority) {
            relatedAncillary.ancillary.effects.splice(index, 1);
          }
        });
      });

      characterSkill.levels[relatedAncillary.level - 1].effects.push(...relatedAncillary.ancillary.effects);
    }

    return { ...characterSkill };
  });
  return stapledTable;
};

export default staple_characterSkills_characterSkillLevelToAncillariesJunction;
