import fse from 'fs-extra';
import * as staple from './stapleFunctions/index.js';
import { output_characters, collate_characterSkillNodes } from './otherFunctions/index.js';

const stapleTables = (folder) => {
  const readJson = (path) => {
    return JSON.parse(fse.readFileSync(`./parsed_files/${folder}/${path}`, 'utf-8'));
  };

  let unitAttributes = readJson('db/unit_attributes_tables.json');
  const unitAttributesLoc = readJson('text/db/unit_attributes.json');
  let specialAbilityPhaseAttributeEffects = readJson('db/special_ability_phase_attribute_effects_tables.json');
  let specialAbilityPhaseStatEffects = readJson('db/special_ability_phase_stat_effects_tables.json');
  const unitStatLoc = readJson('text/db/unit_stat_localisations.json');
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

  unitAttributes = staple.unitAttributes_unitAttributesLoc(unitAttributes, unitAttributesLoc);
  specialAbilityPhaseAttributeEffects = staple.specialAbilityPhaseAttributeEffects_unitAttributes(
    specialAbilityPhaseAttributeEffects,
    unitAttributes
  );
  specialAbilityPhaseStatEffects = staple.specialAbilityPhaseStatEffects_unitStatLoc(specialAbilityPhaseStatEffects, unitStatLoc);

  // You are here: Staple specialAbilityPhases to specialAbilityPhaseAttributeEffects and specialAbilityPhaseStatEffects

  fse.outputFile(`./test/${folder}/specialAbilityPhaseStatEffects.json`, JSON.stringify(specialAbilityPhaseStatEffects, null, 2));

  effects = staple.effects_effectsLoc(effects, effectsLoc);
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
  cultures = staple.cultures_culturesSubcultures(cultures, culturesSubcultures);
  cultures = staple.cultures_factions(cultures, factions);
  cultures = staple.cultures_factionAgentPermittedSubtypes(cultures, factionAgentPermittedSubtypes);
  cultures = staple.cultures_characterSkillNodeSets(cultures, characterSkillNodeSets);

  const collatedNodeSets = collate_characterSkillNodes(characterSkillNodes, cultures);

  fse.outputFile(`./test/${folder}/characterSkillNodes.json`, JSON.stringify(characterSkillNodes, null, 2));
  fse.outputFile(`./test/${folder}/cultures.json`, JSON.stringify(cultures, null, 2));

  output_characters(cultures, collatedNodeSets, folder);
};

export default stapleTables;
