import { stringInterpolator } from '../otherFunctions/index.js';

const unitAttributes_unitAttributesLoc = (unitAttributes, unitAttributesLoc, textReplacements, missingTextReplacements) => {
  const stapledTable = unitAttributes.map((attribute) => {
    const relatedLoc = unitAttributesLoc.find((loc) => {
      return loc.key === `unit_attributes_imued_effect_text_${attribute.key}`;
    });
    attribute.description = relatedLoc?.text ? stringInterpolator(relatedLoc?.text, textReplacements, missingTextReplacements) : '';
    return { ...attribute };
  });
  return stapledTable;
};

export default unitAttributes_unitAttributesLoc;
