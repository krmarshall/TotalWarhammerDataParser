import unitAbilitiesPrune from '../pruneLists/unitAbilitiesPrune.js';

const unitAbilities_unitAbilitiesLoc = (unitAbilities, unitAbilitiesLoc) => {
  const stapledTable = unitAbilities.map((ability) => {
    unitAbilitiesPrune.forEach((prune) => {
      delete ability[prune];
    });

    const relatedLoc = unitAbilitiesLoc.find((loc) => {
      return loc.key === `unit_abilities_onscreen_name_${ability.key}`;
    });
    if (relatedLoc !== undefined) {
      ability.description = relatedLoc.text;
    }

    return { ...ability };
  });
  return stapledTable;
};

export default unitAbilities_unitAbilitiesLoc;
