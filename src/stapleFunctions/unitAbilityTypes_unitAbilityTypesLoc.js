import { stringInterpolator } from '../otherFunctions/index.js';

const unitAbilityTypes_unitAbilityTypesLoc = (unitAbilityTypes, combinedLoc, missingTextReplacements) => {
  const stapledTable = unitAbilityTypes.map((type) => {
    const relatedLoc = combinedLoc[`unit_ability_types_onscreen_name_${type.key}`];
    type.description = relatedLoc ? stringInterpolator(relatedLoc, combinedLoc, missingTextReplacements) : '';
    delete type.show_cursor_trail;
    return { ...type };
  });
  return stapledTable;
};

export default unitAbilityTypes_unitAbilityTypesLoc;
