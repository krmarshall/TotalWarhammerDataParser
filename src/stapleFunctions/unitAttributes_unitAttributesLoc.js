import { stringInterpolator } from '../otherFunctions/index.js';

const unitAttributes_unitAttributesLoc = (unitAttributes, combinedLoc, missingTextReplacements) => {
  const stapledTable = unitAttributes.map((attribute) => {
    const relatedLoc = combinedLoc[`unit_attributes_imued_effect_text_${attribute.key}`];
    attribute.description = relatedLoc ? stringInterpolator(relatedLoc, combinedLoc, missingTextReplacements) : '';
    return { ...attribute };
  });
  return stapledTable;
};

export default unitAttributes_unitAttributesLoc;
