import fse from 'fs-extra';
import ancillariesPrune from './pruneLists/ancillariesPrune.js';
import characterSkillsPrune from './pruneLists/characterSkillsPrune.js';
import characterSkillLevelDetailsPrune from './pruneLists/characterSkillLevelDetailsPrune.js';

const stapleVanillaTables = () => {
  // Think I dont actually need ancillaries tables or locs?
  let ancillaries = JSON.parse(fse.readFileSync('./parsed_files/vanilla/db/ancillaries_tables.json', 'utf-8'));
  const ancillaryTypes = JSON.parse(fse.readFileSync('./parsed_files/vanilla/db/ancillary_types_tables.json', 'utf-8'));
  const ancillariesLoc = JSON.parse(fse.readFileSync('./parsed_files/vanilla/text/db/ancillaries.json', 'utf-8'));
  ancillaries = staple_ancillaries_ancillaryTypes(ancillaries, ancillaryTypes, ancillariesLoc);

  let characterSkillLevelToAncillariesJunction = JSON.parse(
    fse.readFileSync('./parsed_files/vanilla/db/character_skill_level_to_ancillaries_junctions_tables.json', 'utf-8')
  );
  characterSkillLevelToAncillariesJunction = staple_characterSkillLevelToAncillariesJunction_ancillaries(
    characterSkillLevelToAncillariesJunction,
    ancillaries
  );

  let effects = JSON.parse(fse.readFileSync('./parsed_files/vanilla/db/effects_tables.json', 'utf-8'));
  const effectsLoc = JSON.parse(fse.readFileSync('./parsed_files/vanilla/text/db/effects.json', 'utf-8'));
  effects = staple_effects_effectsLoc(effects, effectsLoc);

  let characterSkillLevelToEffectsJunction = JSON.parse(
    fse.readFileSync('./parsed_files/vanilla/db/character_skill_level_to_effects_junctions_tables.json', 'utf-8')
  );
  characterSkillLevelToEffectsJunction = staple_effects_characterSkillLevelToEffectsJunction(effects, characterSkillLevelToEffectsJunction);

  fse.outputFileSync('./test/characterSkillLevelToEffectsJunction.json', JSON.stringify(characterSkillLevelToEffectsJunction, null, 2));

  let characterSkills = JSON.parse(fse.readFileSync('./parsed_files/vanilla/db/character_skills_tables.json', 'utf-8'));
  const characterSkillsLoc = JSON.parse(fse.readFileSync('./parsed_files/vanilla/text/db/character_skills.json', 'utf-8'));
  characterSkills = staple_characterSkills_characterSkillsLoc(characterSkills, characterSkillsLoc);

  const characterSkillLevelDetails = JSON.parse(
    fse.readFileSync('./parsed_files/vanilla/db/character_skill_level_details_tables.json', 'utf-8')
  );
  characterSkills = staple_characterSkills_characterSkillLevelDetails(characterSkills, characterSkillLevelDetails);

  characterSkills = staple_characterSkills_characterSkillLevelToEffectsJunction(characterSkills, characterSkillLevelToEffectsJunction);

  fse.outputFileSync('./test/characterSkills.json', JSON.stringify(characterSkills, null, 2));
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

const staple_characterSkillLevelToAncillariesJunction_ancillaries = (characterSkillLevelToAncillariesJunction, ancillaries) => {
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

// The localised_name and localised_description seem to be mostly accurate to the vanilla locs, might be more important for modded packs.
const staple_characterSkills_characterSkillsLoc = (characterSkills, characterSkillsLoc) => {
  const stapledTable = characterSkills.map((characterSkill) => {
    const locName = characterSkillsLoc.find((characterSkillLoc) => {
      return characterSkillLoc.key === `character_skills_localised_name_${characterSkill.key}`;
    });
    delete characterSkill.localised_name;
    characterSkill.name = locName.text;

    const locDescription = characterSkillsLoc.find((characterSkillLoc) => {
      return characterSkillLoc.key === `character_skills_localised_description_${characterSkill.key}`;
    });
    delete characterSkill.localised_description;
    characterSkill.description = locDescription.text;

    return { ...characterSkill };
  });
  return stapledTable;
};

const staple_characterSkills_characterSkillLevelDetails = (characterSkills, characterSkillLevelDetails) => {
  const stapledTable = characterSkills.map((characterSkill) => {
    characterSkillsPrune.forEach((prune) => {
      delete characterSkill[prune];
    });

    const relatedRecords = characterSkillLevelDetails.filter((record) => {
      return record.skill_key === characterSkill.key;
    });

    if (relatedRecords != []) {
      relatedRecords.forEach((relatedRecord) => {
        characterSkillLevelDetailsPrune.forEach((prune) => {
          delete relatedRecord[prune];
        });

        if (characterSkill.levels === undefined) {
          characterSkill.levels = [];
        }
        characterSkill.levels[relatedRecord.level - 1] = { ...relatedRecord };
        delete characterSkill.levels[relatedRecord.level - 1].level;
        delete characterSkill.levels[relatedRecord.level - 1].skill_key;
      });
    }

    return { ...characterSkill };
  });
  return stapledTable;
};

const staple_characterSkills_characterSkillLevelToEffectsJunction = (characterSkills, characterSkillLevelToEffectsJunction) => {
  const stapledTable = characterSkills.map((characterSkill) => {
    const relatedRecords = characterSkillLevelToEffectsJunction.filter((record) => {
      return record.character_skill_key === characterSkill.key;
    });

    if (relatedRecords != []) {
      relatedRecords.forEach((relatedRecord) => {
        relatedRecord.effect.value = relatedRecord.value;
        relatedRecord.effect.effect_scope = relatedRecord.effect_scope;
        delete relatedRecord.value;
        delete relatedRecord.effect_scope;
        relatedRecord.effects = { ...relatedRecord.effect };
        delete relatedRecord.effect;

        if (characterSkill.levels === undefined) {
          characterSkill.levels = [];
        }
        if (characterSkill.levels[relatedRecord.level - 1] === undefined) {
          characterSkill.levels[relatedRecord.level - 1] = {};
        }
        if (characterSkill.levels[relatedRecord.level - 1].effects === undefined) {
          characterSkill.levels[relatedRecord.level - 1].effects = [];
        }
        characterSkill.levels[relatedRecord.level - 1].effects.push(relatedRecord.effects);
      });
    }

    return { ...characterSkill };
  });

  return stapledTable;
};

export { stapleVanillaTables };
