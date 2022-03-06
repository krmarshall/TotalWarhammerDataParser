// Norsca is treated wonky, subculture exists under chaos so lots of hardcoding fixes here, check with mods/tw3
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
  const norscaIndex = stapledTable.findIndex((culture) => {
    return culture.key === 'wh_dlc08_nor_norsca';
  });
  stapledTable[norscaIndex].subcultures = ['wh_main_sc_nor_norsca'];

  const chaosIndex = stapledTable.findIndex((culture) => {
    return culture.key === 'wh_main_chs_chaos';
  });
  stapledTable[chaosIndex].subcultures = ['wh_main_sc_chs_chaos'];

  const empireIndex = stapledTable.findIndex((culture) => {
    return culture.key === 'wh_main_emp_empire';
  });
  stapledTable[empireIndex].subcultures = ['wh_main_sc_emp_empire'];

  const greenskinsIndex = stapledTable.findIndex((culture) => {
    return culture.key === 'wh_main_grn_greenskins';
  });
  stapledTable[greenskinsIndex].subcultures = ['wh_main_sc_grn_greenskins'];

  stapledTable.forEach((culture) => {
    culture.subculture = culture.subcultures[0];
    delete culture.subcultures;
  });

  return stapledTable;
};

export default cultures_culturesSubcultures;
