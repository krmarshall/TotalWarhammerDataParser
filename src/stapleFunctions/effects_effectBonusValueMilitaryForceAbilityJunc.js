const effects_effectBonusValueMilitaryForceAbilityJunc = (effects, effectBonusValueMilitaryForceAbilityJunc) => {
  const juncMap = {};
  effectBonusValueMilitaryForceAbilityJunc.forEach((junc) => {
    if (juncMap[`${junc.effect}|${junc.bonus_value_id}`] === undefined) {
      juncMap[`${junc.effect}|${junc.bonus_value_id}`] = [];
    }
    juncMap[`${junc.effect}|${junc.bonus_value_id}`].push(junc);
  });

  const stapledTable = effects.map((effect) => {
    let enableAbilities = juncMap[`${effect.effect}|enable`];
    if (enableAbilities?.length > 0) {
      enableAbilities = enableAbilities.slice(0, 3);
      effect.related_abilities = [...enableAbilities];
      return { ...effect };
    }

    let usesModAbilities = juncMap[`${effect.effect}|uses_mod`];
    if (usesModAbilities?.length > 0) {
      usesModAbilities = usesModAbilities.slice(0, 3);
      effect.related_abilities = [...usesModAbilities];
      return { ...effect };
    }

    return { ...effect };
  });
  return stapledTable;
};

export default effects_effectBonusValueMilitaryForceAbilityJunc;
