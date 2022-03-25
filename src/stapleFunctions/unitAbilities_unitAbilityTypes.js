const unitAbilities_unitAbilityTypes = (unitAbilities, unitAbilityTypes) => {
  const stapledTable = unitAbilities.map((ability) => {
    const relatedType = unitAbilityTypes.find((type) => {
      return type.key === ability.type;
    });
    if (relatedType !== undefined) {
      ability.type = { ...relatedType };
    }
    return { ...ability };
  });
  return stapledTable;
};

export default unitAbilities_unitAbilityTypes;
