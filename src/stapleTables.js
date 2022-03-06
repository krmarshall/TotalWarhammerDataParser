import fse from 'fs-extra';
import {
  staple_cultures_characterSkillNodeSets,
  staple_cultures_factionAgentPermittedSubtypes,
  staple_cultures_factions,
  staple_cultures_culturesSubcultures,
  staple_cultures_culturesLoc,
  staple_characterSkillNodes_characterSkillNodesSkillLocks,
  staple_characterSkillNodes_characterSkillNodeLinks,
  staple_characterSkillNodes_characterSkills,
  staple_characterSkills_characterSkillsToQuestAncillaries,
  staple_characterSkills_characterSkillLevelToAncillariesJunction,
  staple_characterSkills_characterSkillLevelToEffectsJunction,
  staple_characterSkills_characterSkillLevelDetails,
  staple_characterSkills_characterSkillsLoc,
  staple_effects_characterSkillLevelToEffectsJunction,
  staple_characterSkillsToQuestAncillaries_ancillaries,
  staple_characterSkillLevelToAncillariesJunction_ancillaries,
  staple_ancillaries_ancillariesToEffects,
  staple_ancillariesToEffects_effects,
  staple_effects_effectsLoc,
  staple_unitAttributes_unitAttributesLoc,
  staple_specialAbilityPhaseAttributeEffects_unitAttributes,
  staple_specialAbilityPhaseStatEffects_unitStatLoc,
} from './stapleFunctions/index.js';
import { output_characters, collate_characterSkillNodes } from './otherFunctions/index.js';

const stapleTables = (folder) => {
  let unitAttributes = JSON.parse(fse.readFileSync(`./parsed_files/${folder}/db/unit_attributes_tables.json`, 'utf-8'));
  const unitAttributesLoc = JSON.parse(fse.readFileSync(`./parsed_files/${folder}/text/db/unit_attributes.json`, 'utf-8'));
  unitAttributes = staple_unitAttributes_unitAttributesLoc(unitAttributes, unitAttributesLoc);

  let specialAbilityPhaseAttributeEffects = JSON.parse(
    fse.readFileSync(`./parsed_files/${folder}/db/special_ability_phase_attribute_effects_tables.json`, 'utf-8')
  );
  specialAbilityPhaseAttributeEffects = staple_specialAbilityPhaseAttributeEffects_unitAttributes(
    specialAbilityPhaseAttributeEffects,
    unitAttributes
  );

  let specialAbilityPhaseStatEffects = JSON.parse(
    fse.readFileSync(`./parsed_files/${folder}/db/special_ability_phase_stat_effects_tables.json`, 'utf-8')
  );
  const unitStatLoc = JSON.parse(fse.readFileSync(`./parsed_files/${folder}/text/db/unit_stat_localisations.json`, 'utf-8'));
  specialAbilityPhaseStatEffects = staple_specialAbilityPhaseStatEffects_unitStatLoc(specialAbilityPhaseStatEffects, unitStatLoc);

  // You are here: Staple specialAbilityPhases to specialAbilityPhaseAttributeEffects and specialAbilityPhaseStatEffects

  fse.outputFile(`./test/${folder}/specialAbilityPhaseStatEffects.json`, JSON.stringify(specialAbilityPhaseStatEffects, null, 2));

  let effects = JSON.parse(fse.readFileSync(`./parsed_files/${folder}/db/effects_tables.json`, 'utf-8'));
  const effectsLoc = JSON.parse(fse.readFileSync(`./parsed_files/${folder}/text/db/effects.json`, 'utf-8'));
  effects = staple_effects_effectsLoc(effects, effectsLoc);

  let ancillaryToEffects = JSON.parse(fse.readFileSync(`./parsed_files/${folder}/db/ancillary_to_effects_tables.json`, 'utf-8'));
  ancillaryToEffects = staple_ancillariesToEffects_effects(ancillaryToEffects, effects);

  let ancillaries = JSON.parse(fse.readFileSync(`./parsed_files/${folder}/db/ancillaries_tables.json`, 'utf-8'));
  ancillaries = staple_ancillaries_ancillariesToEffects(ancillaries, ancillaryToEffects);

  let characterSkillLevelToAncillariesJunction = JSON.parse(
    fse.readFileSync(`./parsed_files/${folder}/db/character_skill_level_to_ancillaries_junctions_tables.json`, 'utf-8')
  );
  characterSkillLevelToAncillariesJunction = staple_characterSkillLevelToAncillariesJunction_ancillaries(
    characterSkillLevelToAncillariesJunction,
    ancillaries
  );

  let characterSkillsToQuestAncillaries = JSON.parse(
    fse.readFileSync(`./parsed_files/${folder}/db/character_skills_to_quest_ancillaries_tables.json`, 'utf-8')
  );
  characterSkillsToQuestAncillaries = staple_characterSkillsToQuestAncillaries_ancillaries(characterSkillsToQuestAncillaries, ancillaries);

  let characterSkillLevelToEffectsJunction = JSON.parse(
    fse.readFileSync(`./parsed_files/${folder}/db/character_skill_level_to_effects_junctions_tables.json`, 'utf-8')
  );
  characterSkillLevelToEffectsJunction = staple_effects_characterSkillLevelToEffectsJunction(effects, characterSkillLevelToEffectsJunction);

  let characterSkills = JSON.parse(fse.readFileSync(`./parsed_files/${folder}/db/character_skills_tables.json`, 'utf-8'));
  const characterSkillsLoc = JSON.parse(fse.readFileSync(`./parsed_files/${folder}/text/db/character_skills.json`, 'utf-8'));
  characterSkills = staple_characterSkills_characterSkillsLoc(characterSkills, characterSkillsLoc);

  const characterSkillLevelDetails = JSON.parse(
    fse.readFileSync(`./parsed_files/${folder}/db/character_skill_level_details_tables.json`, 'utf-8')
  );
  characterSkills = staple_characterSkills_characterSkillLevelDetails(characterSkills, characterSkillLevelDetails);

  characterSkills = staple_characterSkills_characterSkillLevelToEffectsJunction(characterSkills, characterSkillLevelToEffectsJunction);

  characterSkills = staple_characterSkills_characterSkillLevelToAncillariesJunction(
    characterSkills,
    characterSkillLevelToAncillariesJunction
  );

  characterSkills = staple_characterSkills_characterSkillsToQuestAncillaries(characterSkills, characterSkillsToQuestAncillaries);

  let characterSkillNodes = JSON.parse(fse.readFileSync(`./parsed_files/${folder}/db/character_skill_nodes_tables.json`, 'utf-8'));
  characterSkillNodes = staple_characterSkillNodes_characterSkills(characterSkillNodes, characterSkills);

  const characterSkillNodeLinks = JSON.parse(
    fse.readFileSync(`./parsed_files/${folder}/db/character_skill_node_links_tables.json`, 'utf-8')
  );
  characterSkillNodes = staple_characterSkillNodes_characterSkillNodeLinks(characterSkillNodes, characterSkillNodeLinks);

  const characterSkillNodesSkillLocks = JSON.parse(
    fse.readFileSync(`./parsed_files/${folder}/db/character_skill_nodes_skill_locks_tables.json`, 'utf-8')
  );
  characterSkillNodes = staple_characterSkillNodes_characterSkillNodesSkillLocks(characterSkillNodes, characterSkillNodesSkillLocks);

  const culturesLoc = JSON.parse(fse.readFileSync(`./parsed_files/${folder}/text/db/cultures.json`, 'utf-8'));
  let cultures = JSON.parse(fse.readFileSync(`./parsed_files/${folder}/db/cultures_tables.json`, 'utf-8'));
  cultures = staple_cultures_culturesLoc(cultures, culturesLoc);

  const culturesSubcultures = JSON.parse(fse.readFileSync(`./parsed_files/${folder}/db/cultures_subcultures_tables.json`, 'utf-8'));
  cultures = staple_cultures_culturesSubcultures(cultures, culturesSubcultures);

  const factions = JSON.parse(fse.readFileSync(`./parsed_files/${folder}/db/factions_tables.json`, 'utf-8'));
  cultures = staple_cultures_factions(cultures, factions);

  const factionAgentPermittedSubtypes = JSON.parse(
    fse.readFileSync(`./parsed_files/${folder}/db/faction_agent_permitted_subtypes_tables.json`, 'utf-8')
  );
  cultures = staple_cultures_factionAgentPermittedSubtypes(cultures, factionAgentPermittedSubtypes);

  const characterSkillNodeSets = JSON.parse(fse.readFileSync(`./parsed_files/${folder}/db/character_skill_node_sets_tables.json`, 'utf-8'));
  cultures = staple_cultures_characterSkillNodeSets(cultures, characterSkillNodeSets);

  const collatedNodeSets = collate_characterSkillNodes(characterSkillNodes, cultures);

  fse.outputFile(`./test/${folder}/characterSkillNodes.json`, JSON.stringify(characterSkillNodes, null, 2));
  fse.outputFile(`./test/${folder}/cultures.json`, JSON.stringify(cultures, null, 2));

  output_characters(cultures, collatedNodeSets, folder);
};

export default stapleTables;
