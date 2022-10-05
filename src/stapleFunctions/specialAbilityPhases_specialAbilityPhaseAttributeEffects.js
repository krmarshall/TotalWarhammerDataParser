import specialAbilityPhasePrune from '../pruneLists/specialAbilityPhasesPrune.js';
import { parseFloatToFixed } from '../otherFunctions/index.js';

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
    abilityPhase.imbue_ignition = abilityPhase.imbue_ignition >= 1 ? true : false;
    abilityPhase.recharge_time = parseFloatToFixed(abilityPhase.recharge_time);
    abilityPhase.recharge_time > 0 ? undefined : delete abilityPhase.recharge_time;
    abilityPhase.is_hidden_in_ui = JSON.parse(abilityPhase.is_hidden_in_ui);
    abilityPhase.replenish_ammo = parseFloatToFixed(abilityPhase.replenish_ammo);
    abilityPhase.resurrect = JSON.parse(abilityPhase.resurrect);
    abilityPhase.hp_change_frequency = parseFloatToFixed(abilityPhase.hp_change_frequency);
    abilityPhase.heal_amount = parseFloatToFixed(abilityPhase.heal_amount);
    abilityPhase.damage_amount = parseFloatToFixed(abilityPhase.damage_amount);
    abilityPhase.damage_chance = parseFloatToFixed(abilityPhase.damage_chance);
    abilityPhase.max_damaged_entities = parseInt(abilityPhase.max_damaged_entities);

    abilityPhase.barrier_heal_amount = parseFloatToFixed(abilityPhase.barrier_heal_amount);

    abilityPhase.freeze_recharge ? (abilityPhase.freeze_recharge = JSON.parse(abilityPhase.freeze_recharge)) : undefined;
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
      'spreading',
      'barrier_heal_amount',
      'resurrect',
      'hp_change_frequency',
      'heal_amount',
      'damage_amount',
      'max_damaged_entities',
      'damage_chance',
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
