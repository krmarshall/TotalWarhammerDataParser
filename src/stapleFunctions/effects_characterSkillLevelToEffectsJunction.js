import log from '../log.js';
import { numberInsertion, stringInterpolator } from '../otherFunctions/index.js';

const effects_characterSkillLevelToEffectsJunction = (
  effects,
  characterSkillLevelToEffectsJunction,
  combinedLoc,
  missingTextReplacements
) => {
  const effectsMap = {};
  effects.forEach((effect) => {
    effectsMap[effect.effect] = effect;
  });

  const stapledTable = characterSkillLevelToEffectsJunction.map((record) => {
    const relatedEffect = effectsMap[record.effect_key];

    if (relatedEffect?.effect === undefined) {
      log(`missing effect: ${record.effect_key}`, 'grey');
      return;
    }
    // Most skills have a hidden effect that increases or decreases agent action chances
    if (
      (relatedEffect.effect === 'wh_main_effect_agent_action_success_chance_enemy_skill' && relatedEffect.priority === 0) ||
      (relatedEffect.effect === 'wh_main_effect_agent_action_success_chance_skill' && relatedEffect.priority === 0)
    ) {
      return;
    }
    delete record.effect_key;
    relatedEffect.key = relatedEffect.effect;
    record.effect = JSON.parse(JSON.stringify(relatedEffect));
    delete record.effect.effect;
    record.value = parseInt(record.value);

    if (record.effect_scope && record.effect.description) {
      const effectScopeText = combinedLoc[`campaign_effect_scopes_localised_text_${record.effect_scope}`];
      if (effectScopeText !== undefined) {
        record.effect.description += stringInterpolator(effectScopeText, combinedLoc, missingTextReplacements);
      }
    }
    delete record.effect_scope;

    record.effect.description = numberInsertion(record.effect.description, record.value);

    if (record.effect.icon === '' && (record.effect.description === '' || record.effect.description === '[hidden]')) {
      return;
    }
    return { ...record };
  });

  const filteredTable = stapledTable.filter((record) => {
    return record != null;
  });
  return filteredTable;
};

export default effects_characterSkillLevelToEffectsJunction;
