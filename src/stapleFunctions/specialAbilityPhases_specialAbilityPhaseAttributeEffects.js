import specialAbilityPhasePrune from '../pruneLists/specialAbilityPhasesPrune.js';

const parseFloatToFixed = (input) => {
  return parseFloat(parseFloat(input).toFixed(1));
};

// Might have to look more at imbue_contact?
const specialAbilityPhases_specialAbilityPhaseAttributeEffects = (specialAbilityPhases, specialAbilityPhaseAttributeEffects) => {
  const stapledTable = specialAbilityPhases.map((abilityPhase) => {
    specialAbilityPhasePrune.forEach((prune) => {
      delete abilityPhase[prune];
    });
    abilityPhase.duration = parseInt(abilityPhase.duration);
    abilityPhase.unbreakable = JSON.parse(abilityPhase.unbreakable);
    abilityPhase.cant_move = JSON.parse(abilityPhase.cant_move);
    abilityPhase.fatigue_change_ratio = parseFloatToFixed(abilityPhase.fatigue_change_ratio);
    abilityPhase.inspiration_aura_range_mod = parseFloatToFixed(abilityPhase.inspiration_aura_range_mod);
    abilityPhase.ability_recharge_change = parseFloatToFixed(abilityPhase.ability_recharge_change);
    abilityPhase.mana_regen_mod = parseFloatToFixed(abilityPhase.mana_regen_mod);
    abilityPhase.mana_max_depletion_mod = parseFloatToFixed(abilityPhase.mana_max_depletion_mod);
    abilityPhase.imbue_magical = JSON.parse(abilityPhase.imbue_magical);
    abilityPhase.imbue_ignition = parseFloatToFixed(abilityPhase.imbue_ignition);
    abilityPhase.recharge_time = parseFloatToFixed(abilityPhase.recharge_time);
    abilityPhase.is_hidden_in_ui = JSON.parse(abilityPhase.is_hidden_in_ui);
    abilityPhase.replenish_ammo = parseFloatToFixed(abilityPhase.replenish_ammo);
    // Prune properties that are empty
    [
      'unbreakable',
      'cant_move',
      'fatigue_change_ratio',
      'inspiration_aura_range_mod',
      'ability_recharge_change',
      'mana_regen_mod',
      'mana_max_depletion_mod',
      'imbue_magical',
      'imbue_ignition',
      'replenish_ammo',
      'imbue_contact',
    ].forEach((key) => {
      if (!abilityPhase[key]) {
        delete abilityPhase[key];
      }
    });

    const relatedAttributeEffects = specialAbilityPhaseAttributeEffects.filter((attributeEffect) => {
      return attributeEffect.phase === abilityPhase.id;
    });
    if (relatedAttributeEffects.length) {
      abilityPhase.attributes = [];
      relatedAttributeEffects.forEach((attributeEffect) => {
        abilityPhase.attributes.push(attributeEffect.attribute);
      });
    }
    return { ...abilityPhase };
  });
  return stapledTable;
};

export default specialAbilityPhases_specialAbilityPhaseAttributeEffects;
