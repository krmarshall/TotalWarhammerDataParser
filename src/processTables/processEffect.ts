import { GlobalDataInterface, TableRecord } from '../interfaces/GlobalDataInterface';
import { AbilityInterface, EffectInterface } from '../interfaces/ProcessedTreeInterface';
import findImage from '../utils/findImage';
import numberInsertion from '../utils/numberInsertion';
import { parseBoolean, parseInteger } from '../utils/parseStringToTypes';
import stringInterpolator from '../utils/stringInterpolator';
import processAbility from './processAbility';

const processEffect = (folder: string, globalData: GlobalDataInterface, effect: TableRecord, value: string, scope: string) => {
  const returnEffect: EffectInterface = {
    description: numberInsertion(stringInterpolator(effect.description, globalData.parsedData[folder].text), parseInteger(value)),
    key: effect.effect,
    icon: findEffectImage(folder, globalData, effect.icon),
    is_positive_value_good: parseBoolean(effect.is_positive_value_good),
    priority: parseInteger(effect.priority),
  };
  if (scope === 'character_to_character_own') {
    returnEffect.scope = scope;
    returnEffect.value = parseInteger(value);
  }

  const wantedBonusValueIdList = ['enable', 'enable_overchage', 'uses_mod', 'effect_range_mod'];
  // Abilities
  const related_abilities: Array<AbilityInterface> = [];
  // unit_ability
  effect.foreignRefs?.effect_bonus_value_unit_ability_junctions?.forEach((abilityJunc, index) => {
    if (
      (abilityJunc.bonus_value_id === 'recharge_mod' && index < 4 && abilityJunc.localRefs?.unit_abilities?.overpower_option === '') ||
      wantedBonusValueIdList.includes(abilityJunc.bonus_value_id)
    ) {
      related_abilities.push(processAbility(folder, globalData, abilityJunc));
    }
  });
  // unit_ability recharge_mods can link to nearly every spell in the game, so limit the number we add for them, but allow everything for the rest
  wantedBonusValueIdList.push('recharge_mod');
  // unit_set_ability
  effect.foreignRefs?.effect_bonus_value_unit_set_unit_ability_junctions?.forEach((abilityJunc) => {
    if (wantedBonusValueIdList.includes(abilityJunc.bonus_value_id)) {
      related_abilities.push(processAbility(folder, globalData, abilityJunc));
    }
  });
  // army_special_ability
  effect.foreignRefs?.effect_bonus_value_military_force_ability_junctions?.forEach((abilityJunc) => {
    if (wantedBonusValueIdList.includes(abilityJunc.bonus_value_id)) {
      related_abilities.push(processAbility(folder, globalData, abilityJunc));
    }
  });
  if (related_abilities.length > 0) returnEffect.related_abilities = related_abilities;

  return returnEffect;
};

export default processEffect;

const findEffectImage = (folder: string, globalData: GlobalDataInterface, iconArg: string) => {
  const icon = iconArg.replace('.png', '').trim();
  const searchArray = [
    `campaign_ui/effect_bundles/${icon}`,
    `campaign_ui/effect_bundles/${icon.toLowerCase()}`,
    `battle_ui/ability_icons/${icon}`,
    `battle_ui/ability_icons/${icon.toLowerCase()}`,
  ];

  return findImage(folder, globalData, searchArray, icon);
};
