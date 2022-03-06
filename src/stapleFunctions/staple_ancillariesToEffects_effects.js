const staple_ancillariesToEffects_effects = (ancillariesToEffects, effects) => {
  const stapledTable = ancillariesToEffects.map((ancillaryToEffect) => {
    const relatedEffect = effects.find((effect) => {
      return effect.effect === ancillaryToEffect.effect;
    });
    ancillaryToEffect.effect = { ...relatedEffect };
    ancillaryToEffect.value = parseInt(ancillaryToEffect.value);

    return { ...ancillaryToEffect };
  });
  return stapledTable;
};

export default staple_ancillariesToEffects_effects;
