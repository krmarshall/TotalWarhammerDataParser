import { numberInsertion } from '../otherFunctions/index.js';

const ancillariesToEffects_effects = (ancillariesToEffects, effects) => {
  const stapledTable = ancillariesToEffects.map((ancillaryToEffect) => {
    const relatedEffect = effects.find((effect) => {
      return effect.effect === ancillaryToEffect.effect;
    });
    ancillaryToEffect.effect = { ...relatedEffect };
    ancillaryToEffect.value = parseInt(ancillaryToEffect.value);
    delete ancillaryToEffect.effect_scope;

    if (ancillaryToEffect.effect.description !== undefined) {
      ancillaryToEffect.effect.description = numberInsertion(ancillaryToEffect.effect.description, ancillaryToEffect.value);
    }

    return { ...ancillaryToEffect };
  });
  return stapledTable;
};

export default ancillariesToEffects_effects;
