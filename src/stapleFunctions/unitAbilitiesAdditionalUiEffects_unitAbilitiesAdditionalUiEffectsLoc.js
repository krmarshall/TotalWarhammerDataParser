const unitAbilitiesAdditionalUiEffects_unitAbilitiesAdditionalUiEffectsLoc = (
  unitAbilitiesAdditionalUiEffects,
  unitAbilitiesAdditionalUiEffectsLoc
) => {
  const stapledTable = unitAbilitiesAdditionalUiEffects.map((uiEffect) => {
    const relatedLoc = unitAbilitiesAdditionalUiEffectsLoc.find((loc) => {
      return loc.key === `unit_abilities_additional_ui_effects_localised_text_${uiEffect.key}`;
    });
    uiEffect.description = relatedLoc?.text ? relatedLoc?.text : '';
    uiEffect.sort_order = parseInt(uiEffect.sort_order);
    return { ...uiEffect };
  });
  return stapledTable;
};

export default unitAbilitiesAdditionalUiEffects_unitAbilitiesAdditionalUiEffectsLoc;
