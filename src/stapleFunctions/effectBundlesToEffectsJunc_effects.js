import log from '../log.js';

const pruneList = ['effect_scope', 'advancement_stage'];

const effectBundlesToEffectsJunc_effects = (effectBundlesToEffectsJunc, effects) => {
  const effectMap = {};
  effects.forEach((effect) => {
    effectMap[effect.effect] = effect;
  });

  const stapledTable = effectBundlesToEffectsJunc.map((bundle) => {
    pruneList.forEach((prune) => delete bundle[prune]);

    const relatedEffect = effectMap[bundle.effect_key];

    if (relatedEffect === undefined) {
      log(`Effect bundle missing effect: ${bundle.effect_bundle_key}`, 'yellow');
      return null;
    }
    if (relatedEffect.description.trim() === '') {
      return null;
    }

    bundle.effect = { ...relatedEffect };
    delete bundle.effect_key;
    bundle.value = parseInt(bundle.value);

    return { ...bundle };
  });

  const filteredTable = stapledTable.filter((record) => {
    return record !== null;
  });
  return filteredTable;
};

export default effectBundlesToEffectsJunc_effects;
