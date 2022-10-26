const characterSkills_characterSkillsToQuestAncillaries = (characterSkills, characterSkillsToQuestAncillaries) => {
  const stapledTable = characterSkills.map((characterSkill) => {
    const relatedAncillary = characterSkillsToQuestAncillaries.find((ancillary) => {
      return ancillary.skill === characterSkill.key;
    });
    if (relatedAncillary?.ancillary?.effects !== undefined) {
      if (characterSkill.levels === undefined) {
        characterSkill.levels = [];
      }
      if (characterSkill.levels[relatedAncillary.level - 1] === undefined) {
        characterSkill.levels[relatedAncillary.level - 1] = {};
      }
      if (characterSkill.levels[relatedAncillary.level - 1].effects === undefined) {
        characterSkill.levels[relatedAncillary.level - 1].effects = [];
      }

      const tempAncillaryEffects = JSON.parse(JSON.stringify(relatedAncillary.ancillary.effects));

      characterSkill.levels[relatedAncillary.level - 1].effects.forEach((charSkillEffect) => {
        tempAncillaryEffects.forEach((ancillaryEffect, index) => {
          if (ancillaryEffect.priority === charSkillEffect.priority) {
            tempAncillaryEffects.splice(index, 1);
          }
        });
      });

      characterSkill.levels[relatedAncillary.level - 1].effects.push(...tempAncillaryEffects);
      characterSkill.use_quest_for_prefix = relatedAncillary.use_quest_for_prefix;
    }

    return { ...characterSkill };
  });
  return stapledTable;
};

export default characterSkills_characterSkillsToQuestAncillaries;
