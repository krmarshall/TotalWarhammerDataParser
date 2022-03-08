const unitAbilities_unitAbilitiesToAdditionalUiEffectsJuncs = (unitAbilities, unitAbilitiesToAdditionalUiEffectsJuncs) => {
  const stapledTable = unitAbilities.map((ability) => {
    const relatedUiEffects = unitAbilitiesToAdditionalUiEffectsJuncs.filter((uiEffect) => {
      return uiEffect.ability === ability.key;
    });

    if (relatedUiEffects.length) {
      ability.ui_effects = [];
      relatedUiEffects.forEach((uiEffect) => {
        ability.ui_effects.push(uiEffect.effect);
      });
      ability.ui_effects.sort((a, b) => {
        return a.sort_order - b.sort_order;
      });
    }
    return { ...ability };
  });
  return stapledTable;
};

export default unitAbilities_unitAbilitiesToAdditionalUiEffectsJuncs;
