const unitAbilities_unitSpecialAbilities = (unitAbilities, unitSpecialAbilities) => {
  const stapledTable = unitAbilities.map((ability) => {
    const relatedSpecial = unitSpecialAbilities.find((specialAbility) => {
      return specialAbility.key === ability.key;
    });

    if (relatedSpecial !== undefined) {
      ability = { ...ability, ...relatedSpecial };
    }
    return { ...ability };
  });
  return stapledTable;
};

export default unitAbilities_unitSpecialAbilities;
