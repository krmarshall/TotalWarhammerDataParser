import ancillariesPrune from '../pruneLists/ancillariesPrune.js';

const ancillaries_ancillariesToEffects = (ancillaries, ancillariesToEffects) => {
  const stapledTable = ancillaries.map((ancillary) => {
    ancillariesPrune.forEach((prune) => {
      delete ancillary[prune];
    });

    const relatedEffects = ancillariesToEffects.filter((ancillaryToEffect) => {
      return ancillaryToEffect.ancillary === ancillary.key;
    });

    if (relatedEffects.length !== 0) {
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
