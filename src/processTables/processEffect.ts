import { GlobalDataInterface, TableRecord } from '../interfaces/GlobalDataInterface';
import { EffectInterface } from '../interfaces/ProcessedTreeInterface';
import numberInsertion from '../utils/numberInsertion';
import { parseBoolean, parseInteger } from '../utils/parseStringToTypes';
import stringInterpolator from '../utils/stringInterpolator';

const processEffect = (folder: string, globalData: GlobalDataInterface, effect: TableRecord, value: string, scope: string) => {
  const returnEffect: EffectInterface = {
    description: numberInsertion(stringInterpolator(effect.description, globalData.parsedData[folder].text), parseInteger(value as string)),
    effect: effect.effect, // Key
    icon: findEffectImage(folder, globalData, effect.icon),
    is_positive_value_good: parseBoolean(effect.is_positive_value_good),
    priority: parseInteger(effect.priority),
  };
  if (scope === 'character_to_character_own') {
    returnEffect.scope = scope;
  }
  return returnEffect;
};

export default processEffect;

const findEffectImage = (folder: string, globalData: GlobalDataInterface, iconArg: string) => {
  const vanillaGame = folder.includes('2') ? 'vanilla2' : 'vanilla3';
  const icon = iconArg.replace('.png', '').trim();
  const searchArray = [
    `campaign_ui/effect_bundles/${icon}`,
    `campaign_ui/effect_bundles/${icon.toLowerCase()}`,
    `battle_ui/ability_icons/${icon}`,
    `battle_ui/ability_icons/${icon.toLowerCase()}`,
  ];

  const modIcon = searchArray.find((searchPath) => {
    if (globalData.imgPaths[folder][searchPath] !== undefined) {
      return true;
    }
    return false;
  });
  if (modIcon !== undefined) {
    return `${folder}/${modIcon}`;
  }

  const vanillaIcon = searchArray.find((searchPath) => {
    if (globalData.imgPaths[vanillaGame][searchPath] !== undefined) {
      return true;
    }
    return false;
  });
  if (vanillaIcon !== undefined) {
    return `${vanillaGame}/${vanillaIcon}`;
  }

  return icon;
};
