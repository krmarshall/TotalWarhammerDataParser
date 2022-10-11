const effectBonusValueUnitSetUnitAbilityJunc_unitSetUnitAbilityJunc = (effectBonusValueUnitSetUnitAbilityJunc, unitSetUnitAbilityJunc) => {
  const stapledTable = effectBonusValueUnitSetUnitAbilityJunc.map((junc) => {
    const relatedAbility = unitSetUnitAbilityJunc.find((ability) => ability.key === junc.unit_set_ability);
    if (relatedAbility !== undefined) {
      junc.unit_ability = relatedAbility.unit_ability;
      delete junc.unit_set_ability;
    }
    return { ...junc };
  });
  return stapledTable;
};

export default effectBonusValueUnitSetUnitAbilityJunc_unitSetUnitAbilityJunc;
