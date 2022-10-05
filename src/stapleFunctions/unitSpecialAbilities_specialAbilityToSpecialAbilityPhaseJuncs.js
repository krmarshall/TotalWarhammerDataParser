import unitSpecialAbilitiesPrune from '../pruneLists/unitSpecialAbilitiesPrune.js';
import { parseFloatToFixed } from '../otherFunctions/index.js';

const unitSpecialAbilities_specialAbilityToSpecialAbilityPhaseJuncs = (unitSpecialAbilities, specialAbilityToSpecialAbilityPhaseJuncs) => {
  const stapledTable = unitSpecialAbilities.map((ability) => {
    unitSpecialAbilitiesPrune.forEach((prune) => {
      delete ability[prune];
    });
    ability.num_uses = parseInt(ability.num_uses);
    ability.num_uses > 0 ? undefined : delete ability.num_uses;
    ability.active_time = parseFloatToFixed(ability.active_time);
    ability.active_time > 0 ? undefined : delete ability.active_time;
    ability.recharge_time = parseFloatToFixed(ability.recharge_time);
    ability.recharge_time > 0 ? undefined : delete ability.recharge_time;
    ability.initial_recharge = parseFloatToFixed(ability.initial_recharge);
    ability.initial_recharge > 0 ? undefined : delete ability.initial_recharge;
    ability.wind_up_time = parseFloatToFixed(ability.wind_up_time);
    ability.wind_up_time > 0 ? undefined : delete ability.wind_up_time;
    ability.effect_range = parseFloatToFixed(ability.effect_range);
    ability.target_friends = JSON.parse(ability.target_friends);
    ability.target_enemies = JSON.parse(ability.target_enemies);
    ability.target_ground = JSON.parse(ability.target_ground);
    ability.target_self = JSON.parse(ability.target_self);
    ability.target_intercept_range = parseFloatToFixed(ability.target_intercept_range);
    ability.mana_cost = parseFloatToFixed(ability.mana_cost);
    ability.mana_cost > 0 ? undefined : delete ability.mana_cost;
    ability.min_range = parseFloatToFixed(ability.min_range);
    ability.min_range > 0 ? undefined : delete ability.min_range;
    ability.miscast_chance = parseFloatToFixed(ability.miscast_chance);
    ability.miscast_chance > 0 ? undefined : delete ability.miscast_chance;
    ability.shared_recharge_time = parseFloatToFixed(ability.shared_recharge_time);
    ability.shared_recharge_time > 0 ? undefined : delete ability.shared_recharge_time;
    ability.num_effected_friendly_units = parseInt(ability.num_effected_friendly_units);
    ability.num_effected_friendly_units > 1 ? undefined : delete ability.num_effected_friendly_units;
    ability.num_effected_enemy_units = parseInt(ability.num_effected_enemy_units);
    ability.num_effected_enemy_units > 1 ? undefined : delete ability.num_effected_enemy_units;

    const relatedPhases = specialAbilityToSpecialAbilityPhaseJuncs.filter((phase) => {
      return phase.special_ability === ability.key;
    });
    if (relatedPhases.length) {
      ability.phases = [];
      relatedPhases.forEach((phase) => {
        ability.phases[phase.order - 1] = { ...phase.phase };
      });
    }
    return { ...ability };
  });
  return stapledTable;
};

export default unitSpecialAbilities_specialAbilityToSpecialAbilityPhaseJuncs;
