const specialAbilityPhaseStatEffects_uiUnitStats = (specialAbilityPhaseStatEffects, uiUnitStats) => {
  const stapledTable = specialAbilityPhaseStatEffects.map((phaseStatEffect) => {
    const relatedUiUnitStat = uiUnitStats.find((stat) => {
      return stat.key === phaseStatEffect.stat;
    });
    if (relatedUiUnitStat !== undefined) {
      phaseStatEffect.sort_order = parseInt(relatedUiUnitStat.sort_order);
      phaseStatEffect.icon = relatedUiUnitStat.icon.replace('ui/skins/default/', '');
    }
    return { ...phaseStatEffect };
  });
  return stapledTable;
};

export default specialAbilityPhaseStatEffects_uiUnitStats;
