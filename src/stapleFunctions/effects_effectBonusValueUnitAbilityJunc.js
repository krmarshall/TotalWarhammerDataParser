const effects_effectBonusValueUnitAbilityJunc = (effects, effectBonusValueUnitAbilityJunc) => {
  const juncMap = {};
  effectBonusValueUnitAbilityJunc.forEach((junc) => {
    if (juncMap[`${junc.effect}|${junc.bonus_value_id}`] === undefined) {
      juncMap[`${junc.effect}|${junc.bonus_value_id}`] = [];
    }
    juncMap[`${junc.effect}|${junc.bonus_value_id}`].push(junc);
  });

  const stapledTable = effects.map((effect) => {
    const enableAbilities = juncMap[`${effect.effect}|enable`];
    if (enableAbilities?.length > 0) {
      effect.related_abilities = [...enableAbilities];
      return { ...effect };
    }

    const overchargeAbilities = juncMap[`${effect.effect}|enable_overchage`];
    if (overchargeAbilities?.length > 0) {
      effect.related_abilities = [...overchargeAbilities];
      return { ...effect };
    }

    const usesModAbilities = juncMap[`${effect.effect}|uses_mod`];
    if (usesModAbilities?.length > 0) {
      effect.related_abilities = [...usesModAbilities];
      return { ...effect };
    }

    const rechargeModAbilities = juncMap[`${effect.effect}|recharge_mod`];
    // Some effects lower cd on a LOT of abilities, dont want that much spam
    if (
      rechargeModAbilities?.length > 0 &&
      rechargeModAbilities?.length < 3 &&
      // Questionable filter for spells
      rechargeModAbilities[0].unit_ability.overpower_option === ''
    ) {
      effect.related_abilities = [...rechargeModAbilities];
      return { ...effect };
    }

    return { ...effect };
  });
  return stapledTable;
};

export default effects_effectBonusValueUnitAbilityJunc;
