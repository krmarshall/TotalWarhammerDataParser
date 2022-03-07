import unitSpecialAbilitiesPrune from '../pruneLists/unitSpecialAbilitiesPrune.js';

const parseFloatToFixed = (input) => {
  return parseFloat(parseFloat(input).toFixed(1));
};

const unitSpecialAbilities_specialAbilityToSpecialAbilityPhaseJuncs = (unitSpecialAbilities, specialAbilityToSpecialAbilityPhaseJuncs) => {
  const stapledTable = unitSpecialAbilities.map((ability) => {
    unitSpecialAbilitiesPrune.forEach((prune) => {
      delete ability[prune];
    });
    ability.num_uses = parseInt(ability.num_uses);
    ability.active_time = parseFloatToFixed(ability.active_time);
    ability.recharge_time = parseFloatToFixed(ability.recharge_time);
    ability.initial_recharge = parseFloatToFixed(ability.initial_recharge);
    ability.wind_up_time = parseFloatToFixed(ability.wind_up_time);
    ability.passive = JSON.parse(ability.passive);
    ability.effect_range = parseFloatToFixed(ability.effect_range);
    ability.affect_self = JSON.parse(ability.affect_self);
    ability.target_friends = JSON.parse(ability.target_friends);
    ability.target_enemies = JSON.parse(ability.target_enemies);
    ability.target_ground = JSON.parse(ability.target_ground);
    ability.target_self = JSON.parse(ability.target_self);
    ability.target_intercept_range = parseFloatToFixed(ability.target_intercept_range);
    ability.mana_cost = parseFloatToFixed(ability.mana_cost);
    ability.min_range = parseFloatToFixed(ability.min_range);
    ability.miscast_chance = parseFloatToFixed(ability.miscast_chance);
    ability.shared_recharge_time = parseFloatToFixed(ability.shared_recharge_time);

    const relatedPhases = specialAbilityToSpecialAbilityPhaseJuncs.filter((phase) => {
      return phase.special_ability === ability.key;
    });
    if (relatedPhases.length) {
      ability.phases = [];
      relatedPhases.forEach((phase) => {
        ability.phases[phase.order - 1] = phase.phase;
      });
    }
    return { ...ability };
  });
  return stapledTable;
};

export default unitSpecialAbilities_specialAbilityToSpecialAbilityPhaseJuncs;
