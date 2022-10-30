import ancillariesPrune from '../pruneLists/ancillariesPrune.js';

const ancillaries_ancillariesToEffects = (ancillaries, ancillariesToEffects) => {
  const ancEffectsMap = {};
  ancillariesToEffects.forEach((ancEffect) => {
    if (ancEffectsMap[ancEffect.ancillary] === undefined) {
      ancEffectsMap[ancEffect.ancillary] = [];
    }
    ancEffectsMap[ancEffect.ancillary].push(ancEffect);
  });

  const stapledTable = ancillaries.map((ancillary) => {
    ancillariesPrune.forEach((prune) => {
      delete ancillary[prune];
    });

    const relatedEffects = ancEffectsMap[ancillary.key];

    if (relatedEffects !== undefined) {
      relatedEffects.forEach((relatedEffect) => {
        relatedEffect.effect.value = relatedEffect.value;
        relatedEffect.effect.key = relatedEffect.effect.effect;
        delete relatedEffect.effect.effect;

        if (ancillary.effects === undefined) {
          ancillary.effects = [];
        }
        ancillary.effects.push({ ...relatedEffect.effect });
      });
      ancillary.effects.sort((a, b) => {
        return a.priority - b.priority;
      });
    }

    return { ...ancillary };
  });
  return stapledTable;
};

export default ancillaries_ancillariesToEffects;
