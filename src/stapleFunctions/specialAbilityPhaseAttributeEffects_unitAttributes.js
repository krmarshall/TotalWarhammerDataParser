const specialAbilityPhaseAttributeEffects_unitAttributes = (specialAbilityPhaseAttributeEffects, unitAttributes) => {
  const stapledTable = specialAbilityPhaseAttributeEffects.map((phase) => {
    const relatedAttribute = unitAttributes.find((attribute) => {
      return attribute.key === phase.attribute;
    });
    if (relatedAttribute !== undefined) {
      phase.attribute = relatedAttribute;
      phase.attribute.attribute_type = phase.attribute_type;
      delete phase.attribute_type;
    }
    return { ...phase };
  });
  return stapledTable;
};

export default specialAbilityPhaseAttributeEffects_unitAttributes;
