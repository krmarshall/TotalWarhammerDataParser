const unitAttributes_unitAttributesLoc = (unitAttributes, unitAttributesLoc) => {
  const stapledTable = unitAttributes.map((attribute) => {
    const relatedLoc = unitAttributesLoc.find((loc) => {
      return loc.key === `unit_attributes_imued_effect_text_${attribute.key}`;
    });
    attribute.description = relatedLoc?.text ? relatedLoc?.text : '';
    return { ...attribute };
  });
  return stapledTable;
};

export default unitAttributes_unitAttributesLoc;
