const specialAbilityPhaseAttributeEffects_unitAttributes = (specialAbilityPhaseAttributeEffects, unitAttributes, globalData, folder) => {
  const stapledTable = specialAbilityPhaseAttributeEffects.map((phase) => {
    const relatedAttribute = unitAttributes.find((attribute) => {
      return attribute.key === phase.attribute;
    });
    if (relatedAttribute !== undefined) {
      phase.attribute = { ...relatedAttribute };
      phase.attribute.attribute_type = phase.attribute_type;
      phase.attribute.icon = findAttributeImage(globalData, folder, phase.attribute.attribute);

      delete phase.attribute_type;
    }
    return { ...phase };
  });
  return stapledTable;
};

const findAttributeImage = (globalData, folder, attributeKey) => {
  const vanillaGame = folder.includes('2') ? 'vanilla2' : 'vanilla3';
  const icon = `${attributeKey}`;
  const searchArray = [
    `campaign_ui/effect_bundles/attribute_${icon}`,
    `campaign_ui/effect_bundles/attribute_${icon.toLowerCase()}`,
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

export default specialAbilityPhaseAttributeEffects_unitAttributes;
