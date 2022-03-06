const characterSkills_characterSkillLevelToEffectsJunction = (characterSkills, characterSkillLevelToEffectsJunction) => {
  const stapledTable = characterSkills.map((characterSkill) => {
    const relatedRecords = characterSkillLevelToEffectsJunction.filter((record) => {
      return record.character_skill_key === characterSkill.key;
    });

    if (relatedRecords.length) {
      relatedRecords.forEach((relatedRecord) => {
        relatedRecord.effect.value = relatedRecord.value;
        relatedRecord.effect.effect_scope = relatedRecord.effect_scope;
        delete relatedRecord.value;
        delete relatedRecord.effect_scope;
        relatedRecord.effects = { ...relatedRecord.effect };
        delete relatedRecord.effect;
        relatedRecord.effects.value = parseInt(relatedRecord.effects.value);

        if (characterSkill.levels === undefined) {
          characterSkill.levels = [];
        }
        if (characterSkill.levels[relatedRecord.level - 1] === undefined) {
          characterSkill.levels[relatedRecord.level - 1] = {};
        }
        if (characterSkill.levels[relatedRecord.level - 1].effects === undefined) {
          characterSkill.levels[relatedRecord.level - 1].effects = [];
        }
        characterSkill.levels[relatedRecord.level - 1].effects.push(relatedRecord.effects);
      });
      characterSkill.levels.forEach((level) => {
        level.effects.sort((a, b) => {
          return a.priority - b.priority;
        });
      });
    }

    return { ...characterSkill };
  });

  return stapledTable;
};

export default characterSkills_characterSkillLevelToEffectsJunction;
