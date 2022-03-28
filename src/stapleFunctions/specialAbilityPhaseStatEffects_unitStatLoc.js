const specialAbilityPhaseStatEffects_unitStatLoc = (specialAbilityPhaseStatEffects, unitStatLoc) => {
  const stapledTable = specialAbilityPhaseStatEffects.map((statEffect) => {
    const relatedStatLoc = unitStatLoc.find((loc) => {
      return loc.key === `unit_stat_localisations_onscreen_name_${statEffect.stat}`;
    });
    if (relatedStatLoc !== undefined) {
      statEffect.description = relatedStatLoc?.text ? relatedStatLoc?.text : '';
    }
    statEffect.value = parseFloat(parseFloat(statEffect.value).toFixed(1));
    return { ...statEffect };
  });
  return stapledTable;
};

export default specialAbilityPhaseStatEffects_unitStatLoc;
