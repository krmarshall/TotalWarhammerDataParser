const staple_cultures_culturesLoc = (cultures, culturesLoc) => {
  const placeholderIndex = cultures.findIndex((culture) => {
    return culture.key === '*';
  });
  cultures.splice(placeholderIndex, 1);

  const rogueIndex = cultures.findIndex((culture) => {
    return culture.key === 'wh2_main_rogue';
  });
  cultures.splice(rogueIndex, 1);

  const stapledTable = cultures.map((culture) => {
    const relatedLoc = culturesLoc.find((loc) => {
      return loc.key === `cultures_name_${culture.key}`;
    });
    const tempCulture = { key: culture.key, name: relatedLoc.text };

    return { ...tempCulture };
  });
  return stapledTable;
};

export default staple_cultures_culturesLoc;
