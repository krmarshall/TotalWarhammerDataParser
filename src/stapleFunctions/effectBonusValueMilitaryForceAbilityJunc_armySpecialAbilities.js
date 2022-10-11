const effectBonusValueMilitaryForceAbilityJunc_armySpecialAbilities = (effectBonusValueMilitaryForceAbilityJunc, armySpecialAbilities) => {
  const stapledTable = effectBonusValueMilitaryForceAbilityJunc.map((junc) => {
    const relatedAbility = armySpecialAbilities.find((ability) => ability.army_special_ability === junc.force_ability);
    if (relatedAbility !== undefined) {
      junc.unit_ability = relatedAbility.unit_special_ability;
      delete junc.force_ability;
    }
    return { ...junc };
  });
  return stapledTable;
};

export default effectBonusValueMilitaryForceAbilityJunc_armySpecialAbilities;
