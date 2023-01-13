import log from '../log.js';

const characterSkills_characterSkillLevelToEffectsJunction = (characterSkills, characterSkillLevelToEffectsJunction) => {
  const skillEffectsMap = {};
  characterSkillLevelToEffectsJunction.forEach((skillEffect) => {
    if (skillEffectsMap[skillEffect.character_skill_key] === undefined) {
      skillEffectsMap[skillEffect.character_skill_key] = [];
    }
    skillEffectsMap[skillEffect.character_skill_key].push(skillEffect);
  });

  const stapledTable = characterSkills.map((characterSkill) => {
    const relatedRecords = skillEffectsMap[characterSkill.key];

    if (relatedRecords !== undefined) {
      relatedRecords.forEach((relatedRecord) => {
        // If the record has effects instead of effect prop, it has already been parsed and doesnt need to have props shuffled around
        if (relatedRecord.effects === undefined) {
          relatedRecord.effect.value = relatedRecord.value;
          relatedRecord.effect.effect_scope = relatedRecord.effect_scope;
          delete relatedRecord.value;
          delete relatedRecord.effect_scope;
          relatedRecord.effects = { ...relatedRecord.effect };
          delete relatedRecord.effect;
        }

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
        if (level.effects !== undefined) {
          level.effects.sort((a, b) => {
            return a.priority - b.priority;
          });
        } else {
          // log(`skill level with no effects: ${characterSkill.key}`, 'grey');
        }
      });
    }

    return { ...characterSkill };
  });

  return stapledTable;
};

export default characterSkills_characterSkillLevelToEffectsJunction;
