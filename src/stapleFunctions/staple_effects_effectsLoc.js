const staple_effects_effectsLoc = (effects, effectsLoc) => {
  const stapledTable = effects.map((effect) => {
    const locDescription = effectsLoc.find((effectLoc) => {
      return effectLoc.key === `effects_description_${effect.effect}`;
    });
    effect.description = locDescription.text;
    delete effect.icon_negative;
    effect.priority = parseInt(effect.priority);
    // Parse to boolean, is kinda scuffed?
    effect.is_positive_value_good = JSON.parse(effect.is_positive_value_good);

    return { ...effect };
  });
  return stapledTable;
};

export default staple_effects_effectsLoc;
