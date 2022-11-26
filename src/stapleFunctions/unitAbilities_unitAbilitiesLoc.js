import { stringInterpolator } from '../otherFunctions/index.js';
import unitAbilitiesPrune from '../pruneLists/unitAbilitiesPrune.js';

const unitAbilities_unitAbilitiesLoc = (unitAbilities, combinedLoc, missingTextReplacements, globalData, folder) => {
  const stapledTable = unitAbilities.map((ability) => {
    unitAbilitiesPrune.forEach((prune) => {
      delete ability[prune];
    });

    const relatedLoc = combinedLoc[`unit_abilities_onscreen_name_${ability.key}`];
    ability.description = relatedLoc ? stringInterpolator(relatedLoc, combinedLoc, missingTextReplacements) : '';
    ability.is_hidden_in_ui = JSON.parse(ability.is_hidden_in_ui);
    ability.icon_name = findAbilityImage(globalData, folder, ability.icon_name);

    return { ...ability };
  });
  return stapledTable;
};

const findAbilityImage = (globalData, folder, icon_name) => {
  const vanillaGame = folder.includes('2') ? 'vanilla2' : 'vanilla3';
  const icon = icon_name.replace('.png', '').trim();
  const searchArray = [
    `battle_ui/ability_icons/${icon}`,
    `battle_ui/ability_icons/${icon.toLowerCase()}`,
    // WH2 has most of the ability icons in campaign_ui
    `campaign_ui/skills/${icon}`,
    `campaign_ui/skills/${icon.toLowerCase()}`,
    // SFO2 some ability icons have _active in the icon_name, but not actual image name
    `campaign_ui/skills/${icon.replace('_active', '')}`,
    `campaign_ui/skills/${icon.replace('_active', '').toLowerCase()}`,
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

export default unitAbilities_unitAbilitiesLoc;
