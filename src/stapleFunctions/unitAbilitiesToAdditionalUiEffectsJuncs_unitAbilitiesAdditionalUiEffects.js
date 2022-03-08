const unitAbilitiesToAdditionalUiEffectsJuncs_unitAbilitiesAdditionalUiEffects = (
  unitAbilitiesToAdditionalUiEffectsJuncs,
  unitAbilitiesAdditionalUiEffects
) => {
  const stapledTable = unitAbilitiesToAdditionalUiEffectsJuncs.map((junc) => {
    const relatedUiEffect = unitAbilitiesAdditionalUiEffects.find((uiEffect) => {
      return uiEffect.key === junc.effect;
    });
    if (relatedUiEffect !== undefined) {
      junc.effect = relatedUiEffect;
    }
    return { ...junc };
  });
  return stapledTable;
};

export default unitAbilitiesToAdditionalUiEffectsJuncs_unitAbilitiesAdditionalUiEffects;
