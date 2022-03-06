import ancillariesPrune from '../pruneLists/ancillariesPrune.js';

const staple_ancillaries_ancillariesToEffects = (ancillaries, ancillariesToEffects) => {
  const stapledTable = ancillaries.map((ancillary) => {
    ancillariesPrune.forEach((prune) => {
      delete ancillary[prune];
    });

    const relatedEffects = ancillariesToEffects.filter((ancillaryToEffect) => {
      return ancillaryToEffect.ancillary === ancillary.key;
    });

    if (relatedEffects.length) {
      relatedEffects.forEach((relatedEffect) => {
        relatedEffect.effect.value = relatedEffect.value;
        relatedEffect.effect.effect_scope = relatedEffect.effect_scope;

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

export default staple_ancillaries_ancillariesToEffects;
