import { stringInterpolator } from '../otherFunctions/index.js';
import unitAbilitiesPrune from '../pruneLists/unitAbilitiesPrune.js';

const unitAbilities_unitAbilitiesLoc = (unitAbilities, combinedLoc, missingTextReplacements) => {
  const stapledTable = unitAbilities.map((ability) => {
    unitAbilitiesPrune.forEach((prune) => {
      delete ability[prune];
    });

    const relatedLoc = combinedLoc[`unit_abilities_onscreen_name_${ability.key}`];
    ability.description = relatedLoc ? stringInterpolator(relatedLoc, combinedLoc, missingTextReplacements) : '';
    ability.is_hidden_in_ui = JSON.parse(ability.is_hidden_in_ui);

    return { ...ability };
  });
  return stapledTable;
};

export default unitAbilities_unitAbilitiesLoc;
