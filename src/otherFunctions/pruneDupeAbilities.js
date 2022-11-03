const pruneDupeAbilities = (characterSkills) => {
  const prunedTable = characterSkills.map((skill) => {
    skill.levels?.forEach((skillLevel) => {
      const levelAbilities = {};
      skillLevel.effects?.forEach((effect, effectIndex) => {
        effect.related_abilities?.forEach((ability, abilityIndex) => {
          if (levelAbilities[ability.unit_ability.key] === undefined) {
            levelAbilities[ability.unit_ability.key] = [];
          }
          levelAbilities[ability.unit_ability.key].push({ effectIndex, abilityIndex });
        });
      });

      const removeIndexes = [];
      const levelAbilityKeys = Object.keys(levelAbilities);
      levelAbilityKeys.forEach((key) => {
        if (levelAbilities[key].length > 1) {
          levelAbilities[key].shift();
          removeIndexes.push(...levelAbilities[key]);
        }
      });
      removeIndexes.forEach((removeIndex) => {
        skillLevel.effects[removeIndex.effectIndex].related_abilities[removeIndex.abilityIndex] = undefined;
      });
      removeIndexes.forEach((removeIndex) => {
        if (skillLevel.effects[removeIndex.effectIndex].related_abilities !== undefined) {
          skillLevel.effects[removeIndex.effectIndex].related_abilities = skillLevel.effects[
            removeIndex.effectIndex
          ].related_abilities.filter((ability) => ability !== undefined && ability !== null);

          if (skillLevel.effects[removeIndex.effectIndex].related_abilities.length === 0) {
            delete skillLevel.effects[removeIndex.effectIndex].related_abilities;
          }
        }
      });
    });
    return { ...skill };
  });
  return prunedTable;
};

export default pruneDupeAbilities;
