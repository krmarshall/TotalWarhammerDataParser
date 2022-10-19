import log from '../log.js';

const armySpecialAbilities_unitAbilities = (armySpecialAbilities, unitAbilities) => {
  const stapledTable = armySpecialAbilities.map((armyAbility) => {
    // armySpecialAbility links to specialAbilities, but grabbing from unitAbilities to keep consistent with other links
    const relatedAbility = unitAbilities.find((ability) => ability.key === armyAbility.unit_special_ability);
    if (relatedAbility !== undefined) {
      armyAbility.unit_special_ability = relatedAbility;
    } else {
      // In case unitAbilities doesnt have key for some reason?
      log(`missing army ability: ${armyAbility.army_special_ability}`, 'red');
    }

    return { ...armyAbility };
  });
  return stapledTable;
};

export default armySpecialAbilities_unitAbilities;
