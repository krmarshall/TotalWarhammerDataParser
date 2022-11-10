import { numberInsertion, stringInterpolator } from '../otherFunctions/index.js';

const techEffectsJunc_effects = (techEffectsJunc, effects, combinedLoc) => {
  const effectsMap = {};
  effects.forEach((effect) => {
    effectsMap[effect.effect] = effect;
  });

  const stapledTable = techEffectsJunc.map((techEffect) => {
    const relatedEffect = effectsMap[techEffect.effect];

    if (relatedEffect === undefined) {
      return;
    }

    relatedEffect.key = relatedEffect.effect;
    techEffect.effect = JSON.parse(JSON.stringify(relatedEffect));
    delete techEffect.effect.effect;
    techEffect.value = parseInt(techEffect.value);

    if (techEffect.effect_scope && techEffect.effect.description) {
      const effectScopeText = combinedLoc[`campaign_effect_scopes_localised_text_${techEffect.effect_scope}`];
      if (effectScopeText !== undefined) {
        techEffect.effect.description += stringInterpolator(effectScopeText, combinedLoc, []);
      }
    }
    delete techEffect.effect_scope;

    techEffect.effect.description = numberInsertion(techEffect.effect.description, techEffect.value);

    return { ...techEffect };
  });

  const filteredTable = stapledTable.filter((record) => {
    return record != null;
  });
  return filteredTable;
};

export default techEffectsJunc_effects;
