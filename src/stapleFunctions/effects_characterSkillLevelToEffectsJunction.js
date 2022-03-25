const effects_characterSkillLevelToEffectsJunction = (effects, characterSkillLevelToEffectsJunction) => {
  const stapledTable = characterSkillLevelToEffectsJunction.map((record) => {
    const relatedEffect = effects.find((effect) => {
      return effect.effect === record.effect_key;
    });

    // Most skills have a hidden effect that increases or decreases agent action chances
    if (
      (relatedEffect.effect === 'wh_main_effect_agent_action_success_chance_enemy_skill' && relatedEffect.priority === 0) ||
      (relatedEffect.effect === 'wh_main_effect_agent_action_success_chance_skill' && relatedEffect.priority === 0)
    ) {
      return;
    }
    delete record.effect_key;
    relatedEffect.key = relatedEffect.effect;
    record.effect = { ...relatedEffect };
    delete record.effect.effect;

    return { ...record };
  });

  const filteredTable = stapledTable.filter((record) => {
    return record != null;
  });
  return filteredTable;
};

export default effects_characterSkillLevelToEffectsJunction;
