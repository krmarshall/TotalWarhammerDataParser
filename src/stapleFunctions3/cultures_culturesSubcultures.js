const cultures_culturesSubcultures = (cultures, culturesSubcultures) => {
  const stapledTable = cultures.map((culture) => {
    const relatedSubcultures = culturesSubcultures.filter((subculture) => {
      return subculture.culture === culture.key;
    });
    culture.subcultures = [];
    relatedSubcultures.forEach((subculture) => {
      culture.subcultures.push(subculture.subculture);
    });

    return { ...culture };
  });

  // Hardcoded fixes z.z
  const khorneIndex = stapledTable.findIndex((culture) => {
    return culture.key === 'wh3_main_kho_khorne';
  });
  stapledTable[khorneIndex].subcultures = ['wh3_main_sc_kho_khorne'];

  const tzeentchIndex = stapledTable.findIndex((culture) => {
    return culture.key === 'wh3_main_tze_tzeentch';
  });
  stapledTable[tzeentchIndex].subcultures = ['wh3_main_sc_tze_tzeentch'];

  const proKislevIndex = stapledTable.findIndex((culture) => {
    return culture.key === 'wh3_main_pro_ksl_kislev';
  });
  stapledTable.splice(proKislevIndex, 1);

  stapledTable.forEach((culture) => {
    culture.subculture = culture.subcultures[0];
    delete culture.subcultures;
  });

  return stapledTable;
};

export default cultures_culturesSubcultures;
