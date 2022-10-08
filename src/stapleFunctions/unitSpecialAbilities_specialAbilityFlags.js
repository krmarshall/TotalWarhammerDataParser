const unitSpecialAbilities_specialAbilityFlags = (
  unitSpecialAbilities,
  specialAbilityAutoDeactivateFlags,
  specialAbilityInvalidTargetFlags
) => {
  const stapledTable = unitSpecialAbilities.map((ability) => {
    const relatedDeactiveFlags = specialAbilityAutoDeactivateFlags.filter((flag) => ability.key === flag.special_ability);
    const relatedInvalidFlags = specialAbilityInvalidTargetFlags.filter((flag) => ability.key === flag.special_ability);

    if (relatedDeactiveFlags.length !== 0) {
      ability.enabled_if = [];
      relatedDeactiveFlags.forEach((flag) => {
        if (flag.enabled_if !== '') {
          ability.enabled_if.push(flag.enabled_if);
        }
      });
      if (ability.enabled_if.length === 0) {
        delete ability.enabled_if;
      }
    }

    if (relatedInvalidFlags.length !== 0) {
      ability.target_if = [];
      relatedInvalidFlags.forEach((flag) => {
        if (flag.target_if !== '') {
          ability.target_if.push(flag.target_if);
        }
      });
      if (ability.target_if.length === 0) {
        delete ability.target_if;
      }
    }
    return { ...ability };
  });
  return stapledTable;
};

export default unitSpecialAbilities_specialAbilityFlags;
