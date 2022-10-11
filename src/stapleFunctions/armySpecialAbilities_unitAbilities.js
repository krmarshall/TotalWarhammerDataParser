const armySpecialAbilities_unitAbilities = (armySpecialAbilities, unitAbilities) => {
  const stapledTable = armySpecialAbilities.map((armyAbility) => {
    // armySpecialAbility links to specialAbilities, but grabbing from unitAbilities to keep consistent with other links
    const relatedAbility = unitAbilities.find((ability) => ability.key === armyAbility.unit_special_ability);
    if (relatedAbility !== undefined) {
      armyAbility.unit_special_ability = relatedAbility;
    } else {
      // In case unitAbilities doesnt have key for some reason?
      console.log('\x1b[31m', `\bmissing army ability: ${armyAbility.army_special_ability}`, '\x1b[0m');
    }

    return { ...armyAbility };
  });
  return stapledTable;
};

export default armySpecialAbilities_unitAbilities;
