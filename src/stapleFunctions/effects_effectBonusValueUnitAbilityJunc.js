const effects_effectBonusValueUnitAbilityJunc = (effects, effectBonusValueUnitAbilityJunc) => {
  const stapledTable = effects.map((effect) => {
    const relatedAbilities = effectBonusValueUnitAbilityJunc.filter((junc) => {
      return junc.effect === effect.effect && ['enable', 'enable_overchage'].includes(junc.bonus_value_id);
    });
    if (relatedAbilities.length) {
      effect.related_abilities = relatedAbilities;
    }
    return { ...effect };
  });
  return stapledTable;
};

export default effects_effectBonusValueUnitAbilityJunc;
