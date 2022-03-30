import { stringInterpolator, numberPrepend } from '../otherFunctions/index.js';

const specialAbilityPhaseStatEffects_unitStatLoc = (
  specialAbilityPhaseStatEffects,
  unitStatLoc,
  textReplacements,
  missingTextReplacements
) => {
  const stapledTable = specialAbilityPhaseStatEffects.map((statEffect) => {
    const relatedStatLoc = unitStatLoc.find((loc) => {
      return loc.key === `unit_stat_localisations_onscreen_name_${statEffect.stat}`;
    });
    statEffect.value = parseFloat(parseFloat(statEffect.value).toFixed(1));
    statEffect.description = relatedStatLoc?.text
      ? numberPrepend(stringInterpolator(relatedStatLoc?.text, textReplacements, missingTextReplacements), statEffect.value, statEffect.how)
      : '';
    return { ...statEffect };
  });
  return stapledTable;
};

export default specialAbilityPhaseStatEffects_unitStatLoc;
