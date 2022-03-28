import { emptyDirSync } from 'fs-extra';
import fse from 'fs-extra';
import * as staple from './stapleFunctions/index.js';
import * as staple3 from './stapleFunctions3/index.js';
import { output_characters, collate_characterSkillNodes, filterNodeSets } from './otherFunctions/index.js';

const stapleTables = (folder) => {
  console.time(`${folder} staple`);
  const readJson = (path) => {
    return JSON.parse(fse.readFileSync(`./parsed_files/${folder}/${path}`, 'utf-8'));
  };

  let unitAttributes = readJson('db/unit_attributes_tables.json');
  const unitAttributesLoc = readJson('text/db/unit_attributes.json');
  let specialAbilityPhaseAttributeEffects = readJson('db/special_ability_phase_attribute_effects_tables.json');
  let specialAbilityPhaseStatEffects = readJson('db/special_ability_phase_stat_effects_tables.json');
  const unitStatLoc = readJson('text/db/unit_stat_localisations.json');
  let specialAbilityPhases = readJson('db/special_ability_phases_tables.json');
  let specialAbilityToSpecialAbilityPhaseJuncs = readJson('db/special_ability_to_special_ability_phase_junctions_tables.json');
  let unitSpecialAbilities = readJson('db/unit_special_abilities_tables.json');

  let effects = readJson('db/effects_tables.json');
  const effectsLoc = readJson('text/db/effects.json');
  let ancillaryToEffects = readJson('db/ancillary_to_effects_tables.json');
  let ancillaries = readJson('db/ancillaries_tables.json');
  let characterSkillLevelToAncillariesJunction = readJson('db/character_skill_level_to_ancillaries_junctions_tables.json');
  let characterSkillsToQuestAncillaries = readJson('db/character_skills_to_quest_ancillaries_tables.json');
  let characterSkillLevelToEffectsJunction = readJson('db/character_skill_level_to_effects_junctions_tables.json');
  let characterSkills = readJson('db/character_skills_tables.json');
  const characterSkillsLoc = readJson('text/db/character_skills.json');
  const characterSkillLevelDetails = readJson('db/character_skill_level_details_tables.json');
  let characterSkillNodes = readJson('db/character_skill_nodes_tables.json');
  const characterSkillNodeLinks = readJson('db/character_skill_node_links_tables.json');
  const characterSkillNodesSkillLocks = readJson('db/character_skill_nodes_skill_locks_tables.json');
  const culturesLoc = readJson('text/db/cultures.json');
  let cultures = readJson('db/cultures_tables.json');
  const culturesSubcultures = readJson('db/cultures_subcultures_tables.json');
  const factions = readJson('db/factions_tables.json');
  const factionAgentPermittedSubtypes = readJson('db/faction_agent_permitted_subtypes_tables.json');
  const characterSkillNodeSets = readJson('db/character_skill_node_sets_tables.json');
  const unitAbilitiesAdditionalUiEffectsLoc = readJson('text/db/unit_abilities_additional_ui_effects.json');
  let unitAbilitiesAdditionalUiEffects = readJson('db/unit_abilities_additional_ui_effects_tables.json');
  let unitAbilitiesToAdditionalUiEffectsJuncs = readJson('db/unit_abilities_to_additional_ui_effects_juncs_tables.json');
  let unitAbilityTypes = readJson('db/unit_ability_types_tables.json');
  const unitAbilityTypesLoc = readJson('text/db/unit_ability_types.json');
  let unitAbilities = readJson('db/unit_abilities_tables.json');
  const unitAbilitiesLoc = readJson('text/db/unit_abilities.json');
  let effectBonusValueUnitAbilityJunc = readJson('db/effect_bonus_value_unit_ability_junctions_tables.json');

  unitAttributes = staple.unitAttributes_unitAttributesLoc(unitAttributes, unitAttributesLoc);
  specialAbilityPhaseAttributeEffects = staple.specialAbilityPhaseAttributeEffects_unitAttributes(
    specialAbilityPhaseAttributeEffects,
    unitAttributes
  );
  specialAbilityPhaseStatEffects = staple.specialAbilityPhaseStatEffects_unitStatLoc(specialAbilityPhaseStatEffects, unitStatLoc);
  specialAbilityPhases = staple.specialAbilityPhases_specialAbilityPhaseAttributeEffects(
    specialAbilityPhases,
    specialAbilityPhaseAttributeEffects
  );
  specialAbilityPhases = staple.specialAbilityPhases_specialAbilityPhaseStatEffects(specialAbilityPhases, specialAbilityPhaseStatEffects);
  specialAbilityToSpecialAbilityPhaseJuncs = staple.specialAbilityToSpecialAbilityPhaseJuncs_specialAbilityPhases(
    specialAbilityToSpecialAbilityPhaseJuncs,
    specialAbilityPhases
  );
  unitSpecialAbilities = staple.unitSpecialAbilities_specialAbilityToSpecialAbilityPhaseJuncs(
    unitSpecialAbilities,
    specialAbilityToSpecialAbilityPhaseJuncs
  );
  unitAbilitiesAdditionalUiEffects = staple.unitAbilitiesAdditionalUiEffects_unitAbilitiesAdditionalUiEffectsLoc(
    unitAbilitiesAdditionalUiEffects,
    unitAbilitiesAdditionalUiEffectsLoc
  );
  unitAbilitiesToAdditionalUiEffectsJuncs = staple.unitAbilitiesToAdditionalUiEffectsJuncs_unitAbilitiesAdditionalUiEffects(
    unitAbilitiesToAdditionalUiEffectsJuncs,
    unitAbilitiesAdditionalUiEffects
  );
  unitAbilityTypes = staple.unitAbilityTypes_unitAbilityTypesLoc(unitAbilityTypes, unitAbilityTypesLoc);
  unitAbilities = staple.unitAbilities_unitAbilitiesLoc(unitAbilities, unitAbilitiesLoc);
  unitAbilities = staple.unitAbilities_unitAbilityTypes(unitAbilities, unitAbilityTypes);
  unitAbilities = staple.unitAbilities_unitAbilitiesToAdditionalUiEffectsJuncs(unitAbilities, unitAbilitiesToAdditionalUiEffectsJuncs);
  unitAbilities = staple.unitAbilities_unitSpecialAbilities(unitAbilities, unitSpecialAbilities);
  effectBonusValueUnitAbilityJunc = staple.effectBonusValueUnitAbilityJunc_unitAbilities(effectBonusValueUnitAbilityJunc, unitAbilities);
  effects = staple.effects_effectsLoc(effects, effectsLoc);
  // Prob need to filter better that bonus_value_id in effectBonusValueUnitAbilityJunc for related abilities
  effects = staple.effects_effectBonusValueUnitAbilityJunc(effects, effectBonusValueUnitAbilityJunc);
  ancillaryToEffects = staple.ancillariesToEffects_effects(ancillaryToEffects, effects);
  ancillaries = staple.ancillaries_ancillariesToEffects(ancillaries, ancillaryToEffects);
  characterSkillLevelToAncillariesJunction = staple.characterSkillLevelToAncillariesJunction_ancillaries(
    characterSkillLevelToAncillariesJunction,
    ancillaries
  );
  characterSkillsToQuestAncillaries = staple.characterSkillsToQuestAncillaries_ancillaries(characterSkillsToQuestAncillaries, ancillaries);
  characterSkillLevelToEffectsJunction = staple.effects_characterSkillLevelToEffectsJunction(effects, characterSkillLevelToEffectsJunction);
  characterSkills = staple.characterSkills_characterSkillsLoc(characterSkills, characterSkillsLoc);
  characterSkills = staple.characterSkills_characterSkillLevelDetails(characterSkills, characterSkillLevelDetails);
  characterSkills = staple.characterSkills_characterSkillLevelToEffectsJunction(characterSkills, characterSkillLevelToEffectsJunction);
  characterSkills = staple.characterSkills_characterSkillLevelToAncillariesJunction(
    characterSkills,
    characterSkillLevelToAncillariesJunction
  );
  characterSkills = staple.characterSkills_characterSkillsToQuestAncillaries(characterSkills, characterSkillsToQuestAncillaries);
  characterSkillNodes = staple.characterSkillNodes_characterSkills(characterSkillNodes, characterSkills);
  characterSkillNodes = staple.characterSkillNodes_characterSkillNodeLinks(characterSkillNodes, characterSkillNodeLinks);
  characterSkillNodes = staple.characterSkillNodes_characterSkillNodesSkillLocks(characterSkillNodes, characterSkillNodesSkillLocks);
  cultures = staple.cultures_culturesLoc(cultures, culturesLoc);
  if (folder.includes('3')) {
    cultures = staple3.cultures_culturesSubcultures(cultures, culturesSubcultures);
  } else {
    cultures = staple.cultures_culturesSubcultures(cultures, culturesSubcultures);
  }
  cultures = staple.cultures_factions(cultures, factions);
  cultures = staple.cultures_factionAgentPermittedSubtypes(cultures, factionAgentPermittedSubtypes);
  cultures = staple.cultures_characterSkillNodeSets(cultures, characterSkillNodeSets);

  const collatedNodeSets = collate_characterSkillNodes(characterSkillNodes, cultures);

  const filteredNodeSets = filterNodeSets(collatedNodeSets);

  emptyDirSync(`./test/${folder}`);
  if (process.env.NODE_ENV !== 'production') {
    fse.outputJSON(`./test/${folder}/cultures.json`, cultures, { spaces: 2 });
  }

  output_characters(cultures, filteredNodeSets, folder);
  console.timeEnd(`${folder} staple`);
};

export { stapleTables };
