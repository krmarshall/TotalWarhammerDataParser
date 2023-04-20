import { GlobalDataInterface, TableRecord } from '../interfaces/GlobalDataInterface';
import { AbilityInterface, EffectInterface } from '../interfaces/ProcessedTreeInterface';
import findImage from '../utils/findImage';
import numberInsertion from '../utils/numberInsertion';
import { parseBoolean, parseInteger } from '../utils/parseStringToTypes';
import stringInterpolator from '../utils/stringInterpolator';
import processAbility from './processAbility';

const processEffect = (folder: string, globalData: GlobalDataInterface, effect: TableRecord, value: string, scope: string) => {
  const returnEffect: EffectInterface = {
    description: numberInsertion(stringInterpolator(effect.description, globalData.parsedData[folder].text), parseInteger(value as string)),
    effect: effect.effect, // Key
    icon: findEffectImage(folder, globalData, effect.icon),
    is_positive_value_good: parseBoolean(effect.is_positive_value_good),
    priority: parseInteger(effect.priority),
  };
  if (scope === 'character_to_character_own') returnEffect.scope = scope;

  // Abilities
  const related_abilities: Array<AbilityInterface> = [];
  effect.foreignRefs?.effect_bonus_value_unit_ability_junctions?.forEach((effectJunc) => {
    related_abilities.push(processAbility(folder, globalData, effectJunc));
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
