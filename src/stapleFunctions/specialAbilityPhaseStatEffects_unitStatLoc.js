import { stringInterpolator, numberPrepend } from '../otherFunctions/index.js';

const specialAbilityPhaseStatEffects_unitStatLoc = (specialAbilityPhaseStatEffects, combinedLoc, missingTextReplacements) => {
  const stapledTable = specialAbilityPhaseStatEffects.map((statEffect) => {
    const relatedStatLoc = combinedLoc[`unit_stat_localisations_onscreen_name_${statEffect.stat}`];
    statEffect.value = parseFloat(parseFloat(statEffect.value).toFixed(1));
    statEffect.description = relatedStatLoc
      ? numberPrepend(stringInterpolator(relatedStatLoc, combinedLoc, missingTextReplacements), statEffect.value, statEffect.how)
      : '';
    return { ...statEffect };
  });
  return stapledTable;
};

export default specialAbilityPhaseStatEffects_unitStatLoc;
