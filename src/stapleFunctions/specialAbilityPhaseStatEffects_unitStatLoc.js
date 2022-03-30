import { stringInterpolator } from '../otherFunctions/index.js';

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
    if (relatedStatLoc !== undefined) {
      statEffect.description = relatedStatLoc?.text
        ? stringInterpolator(relatedStatLoc?.text, textReplacements, missingTextReplacements)
        : '';
    }
    statEffect.value = parseFloat(parseFloat(statEffect.value).toFixed(1));
    return { ...statEffect };
  });
  return stapledTable;
};

export default specialAbilityPhaseStatEffects_unitStatLoc;
