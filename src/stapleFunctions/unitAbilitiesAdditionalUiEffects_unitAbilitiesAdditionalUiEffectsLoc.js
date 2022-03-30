import { stringInterpolator } from '../otherFunctions/index.js';

const unitAbilitiesAdditionalUiEffects_unitAbilitiesAdditionalUiEffectsLoc = (
  unitAbilitiesAdditionalUiEffects,
  unitAbilitiesAdditionalUiEffectsLoc,
  textReplacements,
  missingTextReplacements
) => {
  const stapledTable = unitAbilitiesAdditionalUiEffects.map((uiEffect) => {
    const relatedLoc = unitAbilitiesAdditionalUiEffectsLoc.find((loc) => {
      return loc.key === `unit_abilities_additional_ui_effects_localised_text_${uiEffect.key}`;
    });
    uiEffect.description = relatedLoc?.text ? stringInterpolator(relatedLoc?.text, textReplacements, missingTextReplacements) : '';
    uiEffect.sort_order = parseInt(uiEffect.sort_order);
    return { ...uiEffect };
  });
  return stapledTable;
};

export default unitAbilitiesAdditionalUiEffects_unitAbilitiesAdditionalUiEffectsLoc;
