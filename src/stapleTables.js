import fse from 'fs-extra';
import {
  staple_effects_effectsLoc,
  staple_ancillariesToEffects_effects,
  staple_ancillaries_ancillariesToEffects,
  staple_characterSkillLevelToAncillariesJunction_ancillaries,
  staple_characterSkillsToQuestAncillaries_ancillaries,
  staple_effects_characterSkillLevelToEffectsJunction,
  staple_characterSkills_characterSkillsLoc,
  staple_characterSkills_characterSkillLevelDetails,
  staple_characterSkills_characterSkillLevelToEffectsJunction,
  staple_characterSkills_characterSkillLevelToAncillariesJunction,
  staple_characterSkills_characterSkillsToQuestAncillaries,
  staple_characterSkillNodes_characterSkills,
  staple_characterSkillNodes_characterSkillNodeLinks,
  staple_characterSkillNodes_characterSkillNodesSkillLocks,
  staple_cultures_culturesLoc,
  staple_cultures_culturesSubcultures,
  staple_cultures_factions,
  staple_cultures_factionAgentPermittedSubtypes,
  stapled_cultures_characterSkillNodeSets,
  collate_characterSkillNodes,
  output_characters,
} from './sharedTableFunctions.js';

// If you read this im sorry.
const stapleVanillaTables = () => {
  let effects = JSON.parse(fse.readFileSync('./parsed_files/vanilla/db/effects_tables.json', 'utf-8'));
  const effectsLoc = JSON.parse(fse.readFileSync('./parsed_files/vanilla/text/db/effects.json', 'utf-8'));
  effects = staple_effects_effectsLoc(effects, effectsLoc);

  let ancillaryToEffects = JSON.parse(fse.readFileSync('./parsed_files/vanilla/db/ancillary_to_effects_tables.json', 'utf-8'));
  ancillaryToEffects = staple_ancillariesToEffects_effects(ancillaryToEffects, effects);

  let ancillaries = JSON.parse(fse.readFileSync('./parsed_files/vanilla/db/ancillaries_tables.json', 'utf-8'));
  ancillaries = staple_ancillaries_ancillariesToEffects(ancillaries, ancillaryToEffects);

  let characterSkillLevelToAncillariesJunction = JSON.parse(
    fse.readFileSync('./parsed_files/vanilla/db/character_skill_level_to_ancillaries_junctions_tables.json', 'utf-8')
  );
  characterSkillLevelToAncillariesJunction = staple_characterSkillLevelToAncillariesJunction_ancillaries(
    characterSkillLevelToAncillariesJunction,
    ancillaries
  );

  let characterSkillsToQuestAncillaries = JSON.parse(
    fse.readFileSync('./parsed_files/vanilla/db/character_skills_to_quest_ancillaries_tables.json', 'utf-8')
  );
  characterSkillsToQuestAncillaries = staple_characterSkillsToQuestAncillaries_ancillaries(characterSkillsToQuestAncillaries, ancillaries);

  let characterSkillLevelToEffectsJunction = JSON.parse(
    fse.readFileSync('./parsed_files/vanilla/db/character_skill_level_to_effects_junctions_tables.json', 'utf-8')
  );
  characterSkillLevelToEffectsJunction = staple_effects_characterSkillLevelToEffectsJunction(effects, characterSkillLevelToEffectsJunction);

  let characterSkills = JSON.parse(fse.readFileSync('./parsed_files/vanilla/db/character_skills_tables.json', 'utf-8'));
  const characterSkillsLoc = JSON.parse(fse.readFileSync('./parsed_files/vanilla/text/db/character_skills.json', 'utf-8'));
  characterSkills = staple_characterSkills_characterSkillsLoc(characterSkills, characterSkillsLoc);

  const characterSkillLevelDetails = JSON.parse(
    fse.readFileSync('./parsed_files/vanilla/db/character_skill_level_details_tables.json', 'utf-8')
  );
  characterSkills = staple_characterSkills_characterSkillLevelDetails(characterSkills, characterSkillLevelDetails);

  characterSkills = staple_characterSkills_characterSkillLevelToEffectsJunction(characterSkills, characterSkillLevelToEffectsJunction);

  characterSkills = staple_characterSkills_characterSkillLevelToAncillariesJunction(
    characterSkills,
    characterSkillLevelToAncillariesJunction
  );

  characterSkills = staple_characterSkills_characterSkillsToQuestAncillaries(characterSkills, characterSkillsToQuestAncillaries);

  let characterSkillNodes = JSON.parse(fse.readFileSync('./parsed_files/vanilla/db/character_skill_nodes_tables.json', 'utf-8'));
  characterSkillNodes = staple_characterSkillNodes_characterSkills(characterSkillNodes, characterSkills);

  const characterSkillNodeLinks = JSON.parse(fse.readFileSync('./parsed_files/vanilla/db/character_skill_node_links_tables.json', 'utf-8'));
  characterSkillNodes = staple_characterSkillNodes_characterSkillNodeLinks(characterSkillNodes, characterSkillNodeLinks);

  const characterSkillNodesSkillLocks = JSON.parse(
    fse.readFileSync('./parsed_files/vanilla/db/character_skill_nodes_skill_locks_tables.json', 'utf-8')
  );
  characterSkillNodes = staple_characterSkillNodes_characterSkillNodesSkillLocks(characterSkillNodes, characterSkillNodesSkillLocks);

  const culturesLoc = JSON.parse(fse.readFileSync('./parsed_files/vanilla/text/db/cultures.json', 'utf-8'));
  let cultures = JSON.parse(fse.readFileSync('./parsed_files/vanilla/db/cultures_tables.json', 'utf-8'));
  cultures = staple_cultures_culturesLoc(cultures, culturesLoc);

  const culturesSubcultures = JSON.parse(fse.readFileSync('./parsed_files/vanilla/db/cultures_subcultures_tables.json', 'utf-8'));
  cultures = staple_cultures_culturesSubcultures(cultures, culturesSubcultures);

  const factions = JSON.parse(fse.readFileSync('./parsed_files/vanilla/db/factions_tables.json', 'utf-8'));
  cultures = staple_cultures_factions(cultures, factions);

  const factionAgentPermittedSubtypes = JSON.parse(
    fse.readFileSync('./parsed_files/vanilla/db/faction_agent_permitted_subtypes_tables.json', 'utf-8')
  );
  cultures = staple_cultures_factionAgentPermittedSubtypes(cultures, factionAgentPermittedSubtypes);

  const characterSkillNodeSets = JSON.parse(fse.readFileSync('./parsed_files/vanilla/db/character_skill_node_sets_tables.json', 'utf-8'));
  cultures = stapled_cultures_characterSkillNodeSets(cultures, characterSkillNodeSets);

  const collatedNodeSets = collate_characterSkillNodes(characterSkillNodes, cultures);

  output_characters(cultures, collatedNodeSets, 'vanilla');
};

export { stapleVanillaTables };
