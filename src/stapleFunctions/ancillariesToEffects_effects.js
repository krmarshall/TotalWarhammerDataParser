import { numberInsertion } from '../otherFunctions/index.js';

const ancillariesToEffects_effects = (ancillariesToEffects, effects) => {
  const effectsMap = {};
  effects.forEach((effect) => {
    effectsMap[effect.effect] = effect;
  });
  const stapledTable = ancillariesToEffects.map((ancillaryToEffect) => {
    const relatedEffect = effectsMap[ancillaryToEffect.effect];

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
