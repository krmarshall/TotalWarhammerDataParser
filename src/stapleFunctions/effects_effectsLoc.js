import { stringInterpolator } from '../otherFunctions/index.js';

const effects_effectsLoc = (effects, combinedLoc, missingTextReplacements, globalData, folder) => {
  const stapledTable = effects.map((effect) => {
    const locDescription = combinedLoc[`effects_description_${effect.effect}`];
    effect.description = locDescription ? stringInterpolator(locDescription, combinedLoc, missingTextReplacements) : '';
    delete effect.icon_negative;
    delete effect.category;
    effect.priority = parseInt(effect.priority);
    // Parse to boolean, is kinda scuffed?
    effect.is_positive_value_good = JSON.parse(effect.is_positive_value_good);
    effect.icon = findEffectImage(globalData, folder, effect.icon);

    return { ...effect };
  });
  return stapledTable;
};

const findEffectImage = (globalData, folder, iconArg) => {
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

export default effects_effectsLoc;
