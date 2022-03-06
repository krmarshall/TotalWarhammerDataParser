const characterSkillsToQuestAncillaries_ancillaries = (characterSkillsToQuestAncillaries, ancillaries) => {
  const stapledTable = characterSkillsToQuestAncillaries.map((characterSkill) => {
    const relatedAncillary = ancillaries.find((ancillary) => {
      return ancillary.key === characterSkill.ancillary;
    });
    if (relatedAncillary != undefined) {
      characterSkill.ancillary = relatedAncillary;
    }
    characterSkill.level = 1;
    characterSkill.use_quest_for_prefix = JSON.parse(characterSkill.use_quest_for_prefix);

    return { ...characterSkill };
  });
  return stapledTable;
};

export default characterSkillsToQuestAncillaries_ancillaries;
