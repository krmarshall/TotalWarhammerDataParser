import { numberInsertion } from '../otherFunctions/index.js';

const effectBundles_effectBundlesToEffectsJunc = (effectBundles, effectBundlesToEffectsJunc) => {
  const effectJuncMap = {};
  effectBundlesToEffectsJunc.forEach((effect) => {
    if (effectJuncMap[effect.effect_bundle_key] === undefined) {
      effectJuncMap[effect.effect_bundle_key] = [];
    }
    effectJuncMap[effect.effect_bundle_key].push(effect);
  });

  const stapledTable = effectBundles.map((bundle) => {
    const relatedEffects = effectJuncMap[bundle.key];

    if (relatedEffects !== undefined) {
      bundle.effects = [...relatedEffects];

      bundle.effects.forEach((effect) => {
        delete effect.effect_bundle_key;
        effect.description = numberInsertion(effect.description, effect.value);
        if (effect.key === undefined) {
          effect.key = effect.effect;
        }
      });
    }

    return { ...bundle };
  });
  return stapledTable;
};

export default effectBundles_effectBundlesToEffectsJunc;
