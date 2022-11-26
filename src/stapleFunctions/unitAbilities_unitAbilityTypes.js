const unitAbilities_unitAbilityTypes = (unitAbilities, unitAbilityTypes, globalData, folder) => {
  const stapledTable = unitAbilities.map((ability) => {
    const relatedType = unitAbilityTypes.find((type) => {
      return type.key === ability.type;
    });
    if (relatedType !== undefined) {
      ability.type = { ...relatedType };
      ability.type.icon_path = findAbilityTypeImage(globalData, folder, ability.type.icon_path);
    }
    return { ...ability };
  });
  return stapledTable;
};

const findAbilityTypeImage = (globalData, folder, icon_path) => {
  const vanillaGame = folder.includes('2') ? 'vanilla2' : 'vanilla3';
  const icon = icon_path.replace('.png', '').trim().replace(' ', '_').replace(/^ui\//, '');

  const modIcon = globalData.imgPaths[folder][icon];
  if (modIcon !== undefined) {
    return `${folder}/${modIcon}`;
  }

  const vanillaIcon = globalData.imgPaths[vanillaGame][icon];
  if (vanillaIcon !== undefined) {
    return `${vanillaGame}/${vanillaIcon}`;
  }

  return icon;
};

export default unitAbilities_unitAbilityTypes;
