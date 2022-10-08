import { stringInterpolator } from '../otherFunctions/index.js';

const effects_effectsLoc = (effects, combinedLoc, missingTextReplacements) => {
  const stapledTable = effects.map((effect) => {
    const locDescription = combinedLoc[`effects_description_${effect.effect}`];
    effect.description = locDescription ? stringInterpolator(locDescription, combinedLoc, missingTextReplacements) : '';
    delete effect.icon_negative;
    delete effect.category;
    effect.priority = parseInt(effect.priority);
    // Parse to boolean, is kinda scuffed?
    effect.is_positive_value_good = JSON.parse(effect.is_positive_value_good);

    return { ...effect };
  });
  return stapledTable;
};

export default effects_effectsLoc;
