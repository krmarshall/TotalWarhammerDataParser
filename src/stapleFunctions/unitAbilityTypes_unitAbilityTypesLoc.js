import { stringInterpolator } from '../otherFunctions/index.js';

const unitAbilityTypes_unitAbilityTypesLoc = (unitAbilityTypes, unitAbilityTypesLoc, textReplacements, missingTextReplacements) => {
  const stapledTable = unitAbilityTypes.map((type) => {
    const relatedLoc = unitAbilityTypesLoc.find((loc) => {
      return loc.key === `unit_ability_types_onscreen_name_${type.key}`;
    });
    type.description = relatedLoc?.text ? stringInterpolator(relatedLoc?.text, textReplacements, missingTextReplacements) : '';
    delete type.show_cursor_trail;
    return { ...type };
  });
  return stapledTable;
};

export default unitAbilityTypes_unitAbilityTypesLoc;
