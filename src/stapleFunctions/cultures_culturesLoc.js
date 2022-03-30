import { stringInterpolator } from '../otherFunctions/index.js';

const cultures_culturesLoc = (cultures, culturesLoc, textReplacements, missingTextReplacements) => {
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
    const tempCulture = {
      key: culture.key,
      name: relatedLoc?.text ? stringInterpolator(relatedLoc?.text, textReplacements, missingTextReplacements) : '',
    };

    return { ...tempCulture };
  });
  return stapledTable;
};

export default cultures_culturesLoc;
