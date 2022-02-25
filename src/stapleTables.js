import fse from 'fs-extra';
import ancillariesPrune from './pruneLists/ancillariesPrune.js';

const stapleVanillaTables = () => {
  // Think I dont actually need ancillaries tables or locs?
  let ancillaries = JSON.parse(fse.readFileSync('./parsed_files/vanilla/db/ancillaries_tables.json', 'utf-8'));
  const ancillaryTypes = JSON.parse(fse.readFileSync('./parsed_files/vanilla/db/ancillary_types_tables.json', 'utf-8'));
  const ancillariesLoc = JSON.parse(fse.readFileSync('./parsed_files/vanilla/text/db/ancillaries.json', 'utf-8'));
  ancillaries = [...staple_ancillaries_ancillaryTypes(ancillaries, ancillaryTypes, ancillariesLoc)];

  let characterSkillLevelToAncillariesJunction = JSON.parse(
    fse.readFileSync('./parsed_files/vanilla/db/character_skill_level_to_ancillaries_junctions_tables.json', 'utf-8')
  );
  characterSkillLevelToAncillariesJunction = [
    ...staple_characterSkillLevelToAncillariesJunction_ancillaries(
      characterSkillLevelToAncillariesJunction,
      ancillaries
    ),
  ];

  let effects = JSON.parse(fse.readFileSync('./parsed_files/vanilla/db/effects_tables.json', 'utf-8'));
  const effectsLoc = JSON.parse(fse.readFileSync('./parsed_files/vanilla/text/db/effects.json', 'utf-8'));
  effects = [...staple_effects_effectsLoc(effects, effectsLoc)];

  let characterSkillLevelToEffectsJunction = JSON.parse(
    fse.readFileSync('./parsed_files/vanilla/db/character_skill_level_to_effects_junctions_tables.json', 'utf-8')
  );
  characterSkillLevelToEffectsJunction = [
    ...staple_effects_characterSkillLevelToEffectsJunction(effects, characterSkillLevelToEffectsJunction),
  ];

  fse.outputFileSync('./test/test.json', JSON.stringify(characterSkillLevelToEffectsJunction, null, 2));
};

const staple_ancillaries_ancillaryTypes = (ancillaries, ancillaryTypes, ancillariesLoc) => {
  const stapledTable = ancillaries.map((ancillary) => {
    ancillariesPrune.forEach((prune) => {
      delete ancillary[prune];
    });

    const relatedAncillaryType = ancillaryTypes.find((ancillaryType) => {
      return ancillaryType.type === ancillary.type;
    });
    ancillary.ui_icon = relatedAncillaryType.ui_icon;

    const locName = ancillariesLoc.find((ancillaryLoc) => {
      return ancillaryLoc.key === `ancillaries_onscreen_name_${ancillary.key}`;
    });
    ancillary.name = locName.text;

    const locText = ancillariesLoc.find((ancillaryLoc) => {
      return ancillaryLoc.key === `ancillaries_colour_text_${ancillary.key}`;
    });
    ancillary.text = locText.text;

    return { ...ancillary };
  });
  return stapledTable;
};

const staple_characterSkillLevelToAncillariesJunction_ancillaries = (
  characterSkillLevelToAncillariesJunction,
  ancillaries
) => {
  const stapledTable = characterSkillLevelToAncillariesJunction.map((record) => {
    const relatedAncillary = ancillaries.find((ancillary) => {
      return ancillary.key === record.granted_ancillary;
    });
    record.granted_ancillary = { ...relatedAncillary };

    return { ...record };
  });
  return stapledTable;
};

const staple_effects_effectsLoc = (effects, effectsLoc) => {
  const stapledTable = effects.map((effect) => {
    const locDescription = effectsLoc.find((effectLoc) => {
      return effectLoc.key === `effects_description_${effect.effect}`;
    });
    effect.description = locDescription.text;
    return { ...effect };
  });
  return stapledTable;
};

const staple_effects_characterSkillLevelToEffectsJunction = (effects, characterSkillLevelToEffectsJunction) => {
  const stapledTable = characterSkillLevelToEffectsJunction.map((record) => {
    const relatedEffect = effects.find((effect) => {
      return effect.effect === record.effect_key;
    });

    // Most skills have an effect that increases or decreases agent action chances, if I dont want to display these in the future uncomment these sections
    // if (
    //   (relatedEffect.effect === 'wh_main_effect_agent_action_success_chance_enemy_skill' &&
    //     relatedEffect.priority === '0') ||
    //   (relatedEffect.effect === 'wh_main_effect_agent_action_success_chance_skill' && relatedEffect.priority === '0')
    // ) {
    //   return;
    // }
    delete relatedEffect.icon_negative;
    delete record.effect_key;
    relatedEffect.key = relatedEffect.effect;
    record.effect = { ...relatedEffect };
    delete record.effect.effect;
    return { ...record };
  });

  // const filteredTable = stapledTable.filter((record) => {
  //   return record != null;
  // });
  // return filteredTable;
  return stapledTable;
};

export { stapleVanillaTables };
