import { stringInterpolator } from '../otherFunctions/index.js';

// The localised_name and localised_description seem to be mostly accurate to the vanilla locs, might be more important for modded packs.
const characterSkills_characterSkillsLoc = (characterSkills, combinedLoc, missingTextReplacements, globalData, folder) => {
  const stapledTable = characterSkills.map((characterSkill) => {
    const locName = combinedLoc[`character_skills_localised_name_${characterSkill.key}`];
    delete characterSkill.localised_name;
    characterSkill.name = locName ? stringInterpolator(locName, combinedLoc, missingTextReplacements) : '';

    const locDescription = combinedLoc[`character_skills_localised_description_${characterSkill.key}`];
    delete characterSkill.localised_description;
    characterSkill.description = locDescription ? stringInterpolator(locDescription, combinedLoc, missingTextReplacements) : '';
    characterSkill.image_path = findSkillImage(globalData, folder, characterSkill.image_path);

    return { ...characterSkill };
  });
  return stapledTable;
};

const findSkillImage = (globalData, folder, image_path) => {
  const vanillaGame = folder.includes('2') ? 'vanilla2' : 'vanilla3';
  const icon = image_path.replace('.png', '').trim();
  const searchArray = [
    `campaign_ui/skills/${icon}`,
    `campaign_ui/skills/${icon.toLowerCase()}`,
    // WH2 has pretty much all the skill icons in campaign_ui, WH3 has many of the spells/abilities under battle_ui
    `battle_ui/ability_icons/${icon}`,
    `battle_ui/ability_icons/${icon.toLowerCase()}`,
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

  const knownBadIcon = missingSkillIconMap[icon];
  if (knownBadIcon !== undefined) {
    return `${vanillaGame}/${knownBadIcon}`;
  }

  return icon;
};

const missingSkillIconMap = {
  item_arcane_item: 'campaign_ui/skills/item_arcane_item',
};

export default characterSkills_characterSkillsLoc;
