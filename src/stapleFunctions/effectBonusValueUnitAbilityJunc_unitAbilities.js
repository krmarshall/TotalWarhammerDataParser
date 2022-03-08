const effectBonusValueUnitAbilityJunc_unitAbilities = (effectBonusValueUnitAbilityJunc, unitAbilities) => {
  const stapledTable = effectBonusValueUnitAbilityJunc.map((junc) => {
    const relatedAbility = unitAbilities.find((ability) => {
      return ability.key === junc.unit_ability;
    });
    if (relatedAbility !== undefined) {
      junc.unit_ability = relatedAbility;
    }
    return { ...junc };
  });
  return stapledTable;
};

export default effectBonusValueUnitAbilityJunc_unitAbilities;
