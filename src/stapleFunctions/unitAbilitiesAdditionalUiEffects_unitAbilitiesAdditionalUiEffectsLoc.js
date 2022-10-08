import { stringInterpolator } from '../otherFunctions/index.js';

const unitAbilitiesAdditionalUiEffects_unitAbilitiesAdditionalUiEffectsLoc = (
  unitAbilitiesAdditionalUiEffects,
  combinedLoc,
  missingTextReplacements
) => {
  const stapledTable = unitAbilitiesAdditionalUiEffects.map((uiEffect) => {
    const relatedLoc = combinedLoc[`unit_abilities_additional_ui_effects_localised_text_${uiEffect.key}`];
    uiEffect.description = relatedLoc ? stringInterpolator(relatedLoc, combinedLoc, missingTextReplacements) : '';
    uiEffect.sort_order = parseInt(uiEffect.sort_order);
    return { ...uiEffect };
  });
  return stapledTable;
};

export default unitAbilitiesAdditionalUiEffects_unitAbilitiesAdditionalUiEffectsLoc;
