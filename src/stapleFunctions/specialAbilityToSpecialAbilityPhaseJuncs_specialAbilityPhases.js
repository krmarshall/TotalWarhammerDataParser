const specialAbilityToSpecialAbilityPhaseJuncs_specialAbilityPhases = (specialAbilityToSpecialAbilityPhaseJuncs, specialAbilityPhases) => {
  const stapledTable = specialAbilityToSpecialAbilityPhaseJuncs.map((phaseJunc) => {
    const relatedAbilityPhase = specialAbilityPhases.find((abilityPhase) => {
      return abilityPhase.id === phaseJunc.phase;
    });
    if (relatedAbilityPhase !== undefined) {
      phaseJunc.phase = relatedAbilityPhase;
      delete phaseJunc.phase.id;
    }
    phaseJunc.order = parseInt(phaseJunc.order);
    return { ...phaseJunc };
  });
  return stapledTable;
};

export default specialAbilityToSpecialAbilityPhaseJuncs_specialAbilityPhases;
