const unitSetUnitAbilityJunc_unit_abilities = (unitSetUnitAbilityJunc, unitAbilities) => {
  const stapledTable = unitSetUnitAbilityJunc.map((junc) => {
    const relatedAbility = unitAbilities.find((ability) => ability.key === junc.unit_ability);
    if (relatedAbility !== undefined) {
      junc.unit_ability = relatedAbility;
    }
    return { ...junc };
  });
  return stapledTable;
};

export default unitSetUnitAbilityJunc_unit_abilities;
