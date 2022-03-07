const specialAbilityPhases_specialAbilityPhaseStatEffects = (specialAbilityPhases, specialAbilityPhaseStatEffects) => {
  const stapledTable = specialAbilityPhases.map((phase) => {
    const relatedStatEffects = specialAbilityPhaseStatEffects.filter((statEffect) => {
      return statEffect.phase === phase.id;
    });
    if (relatedStatEffects.length) {
      phase.stat_effects = [];
      relatedStatEffects.forEach((statEffect) => {
        delete statEffect.phase;
        phase.stat_effects.push(statEffect);
      });
    }
    return { ...phase };
  });
  return stapledTable;
};

export default specialAbilityPhases_specialAbilityPhaseStatEffects;
