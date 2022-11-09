import { emptyDirSync } from 'fs-extra';
import fse from 'fs-extra';
import * as staple from './stapleFunctions/index.js';
import * as staple3 from './stapleFunctions3/index.js';
import * as stapleTechs from './stapleFunctionsTechs/index.js';
import {
  output_characters,
  collate_characterSkillNodes,
  filterNodeSets,
  output_characterLists,
  pruneDupeAbilities,
  output_techs,
} from './otherFunctions/index.js';
import log from './log.js';

// Staple tables up to effects, used by both skill and tech trees
const stapleTablesEffects = (readTable, combinedLoc, missingTextReplacements) => {
  let unitAttributes = readTable('unit_attributes_tables');
  let specialAbilityPhaseAttributeEffects = readTable('special_ability_phase_attribute_effects_tables');
  let specialAbilityPhaseStatEffects = readTable('special_ability_phase_stat_effects_tables');
  const uiUnitStats = readTable('ui_unit_stats_tables');
  let specialAbilityPhases = readTable('special_ability_phases_tables');
  let specialAbilityToSpecialAbilityPhaseJuncs = readTable('special_ability_to_special_ability_phase_junctions_tables');
  let unitSpecialAbilities = readTable('unit_special_abilities_tables');
  let unitAbilitiesAdditionalUiEffects = readTable('unit_abilities_additional_ui_effects_tables');
  let unitAbilitiesToAdditionalUiEffectsJuncs = readTable('unit_abilities_to_additional_ui_effects_juncs_tables');
  let unitAbilityTypes = readTable('unit_ability_types_tables');
  let unitAbilities = readTable('unit_abilities_tables');
  let effectBonusValueUnitAbilityJunc = readTable('effect_bonus_value_unit_ability_junctions_tables');
  let effects = readTable('effects_tables');
  let battleVortexes = readTable('battle_vortexs_tables');
  let projectileBombardments = readTable('projectile_bombardments_tables');
  let projectiles = readTable('projectiles_tables');
  let projectilesExplosions = readTable('projectiles_explosions_tables');
  let specialAbilityAutoDeactivateFlags = readTable('special_ability_to_auto_deactivate_flags_tables');
  let specialAbilityInvalidTargetFlags = readTable('special_ability_to_invalid_target_flags_tables');
  let unitSetUnitAbilityJunc = readTable('unit_set_unit_ability_junctions_tables');
  let effectBonusValueUnitSetUnitAbilityJunc = readTable('effect_bonus_value_unit_set_unit_ability_junctions_tables');
  let armySpecialAbilities = readTable('army_special_abilities_tables');
  let effectBonusValueMilitaryForceAbilityJunc = readTable('effect_bonus_value_military_force_ability_junctions_tables');

  // Phases
  unitAttributes = staple.unitAttributes_unitAttributesLoc(unitAttributes, combinedLoc, missingTextReplacements);
  specialAbilityPhaseAttributeEffects = staple.specialAbilityPhaseAttributeEffects_unitAttributes(
    specialAbilityPhaseAttributeEffects,
    unitAttributes
  );
  specialAbilityPhaseStatEffects = staple.specialAbilityPhaseStatEffects_unitStatLoc(
    specialAbilityPhaseStatEffects,
    combinedLoc,
    missingTextReplacements
  );
  specialAbilityPhaseStatEffects = staple.specialAbilityPhaseStatEffects_uiUnitStats(specialAbilityPhaseStatEffects, uiUnitStats);
  specialAbilityPhases = staple.specialAbilityPhases_specialAbilityPhaseAttributeEffects(
    specialAbilityPhases,
    specialAbilityPhaseAttributeEffects
  );
  specialAbilityPhases = staple.specialAbilityPhases_specialAbilityPhaseStatEffects(specialAbilityPhases, specialAbilityPhaseStatEffects);
  specialAbilityPhases = staple.specialAbilityPhases_specialAbilityPhases(specialAbilityPhases);
  specialAbilityToSpecialAbilityPhaseJuncs = staple.specialAbilityToSpecialAbilityPhaseJuncs_specialAbilityPhases(
    specialAbilityToSpecialAbilityPhaseJuncs,
    specialAbilityPhases
  );

  // Abilities
  unitSpecialAbilities = staple.unitSpecialAbilities_specialAbilityToSpecialAbilityPhaseJuncs(
    unitSpecialAbilities,
    specialAbilityToSpecialAbilityPhaseJuncs
  );
  battleVortexes = staple.battleVortexes_specialAbilityPhases(battleVortexes, specialAbilityPhases);
  projectilesExplosions = staple.projectilesExplosions_specialAbilityPhases(projectilesExplosions, specialAbilityPhases);
  projectiles = staple.projectiles_specialAbilityPhases(projectiles, specialAbilityPhases);
  projectiles = staple.projectiles_projectilesExplosions(projectiles, projectilesExplosions);
  projectileBombardments = staple.projectileBombardments_projectiles(projectileBombardments, projectiles);
  unitSpecialAbilities = staple.unitSpecialAbilities_battleVortexes(unitSpecialAbilities, battleVortexes);
  unitSpecialAbilities = staple.unitSpecialAbilities_projectiles(unitSpecialAbilities, projectiles);
  unitSpecialAbilities = staple.unitSpecialAbilities_projectileBombardments(unitSpecialAbilities, projectileBombardments);
  specialAbilityAutoDeactivateFlags = staple.specialAbilityAutoDeactivateFlags_specialAbilityInvalidFlagsLoc(
    specialAbilityAutoDeactivateFlags,
    combinedLoc,
    missingTextReplacements
  );
  specialAbilityInvalidTargetFlags = staple.specialAbilityInvalidTargetFlags_specialAbilityInvalidFlagsLoc(
    specialAbilityInvalidTargetFlags,
    combinedLoc,
    missingTextReplacements
  );
  unitSpecialAbilities = staple.unitSpecialAbilities_specialAbilityFlags(
    unitSpecialAbilities,
    specialAbilityAutoDeactivateFlags,
    specialAbilityInvalidTargetFlags
  );

  unitAbilitiesAdditionalUiEffects = staple.unitAbilitiesAdditionalUiEffects_unitAbilitiesAdditionalUiEffectsLoc(
    unitAbilitiesAdditionalUiEffects,
    combinedLoc,
    missingTextReplacements
  );
  unitAbilitiesToAdditionalUiEffectsJuncs = staple.unitAbilitiesToAdditionalUiEffectsJuncs_unitAbilitiesAdditionalUiEffects(
    unitAbilitiesToAdditionalUiEffectsJuncs,
    unitAbilitiesAdditionalUiEffects
  );
  unitAbilityTypes = staple.unitAbilityTypes_unitAbilityTypesLoc(unitAbilityTypes, combinedLoc, missingTextReplacements);
  unitAbilities = staple.unitAbilities_unitAbilitiesLoc(unitAbilities, combinedLoc, missingTextReplacements);
  unitAbilities = staple.unitAbilities_unitAbilityTypes(unitAbilities, unitAbilityTypes);
  unitAbilities = staple.unitAbilities_unitAbilitiesToAdditionalUiEffectsJuncs(unitAbilities, unitAbilitiesToAdditionalUiEffectsJuncs);
  unitAbilities = staple.unitAbilities_unitSpecialAbilities(unitAbilities, unitSpecialAbilities);
  effectBonusValueUnitAbilityJunc = staple.effectBonusValueUnitAbilityJunc_unitAbilities(effectBonusValueUnitAbilityJunc, unitAbilities);
  unitSetUnitAbilityJunc = staple.unitSetUnitAbilityJunc_unit_abilities(unitSetUnitAbilityJunc, unitAbilities);
  effectBonusValueUnitSetUnitAbilityJunc = staple.effectBonusValueUnitSetUnitAbilityJunc_unitSetUnitAbilityJunc(
    effectBonusValueUnitSetUnitAbilityJunc,
    unitSetUnitAbilityJunc
  );
  armySpecialAbilities = staple.armySpecialAbilities_unitAbilities(armySpecialAbilities, unitAbilities);
  effectBonusValueMilitaryForceAbilityJunc = staple.effectBonusValueMilitaryForceAbilityJunc_armySpecialAbilities(
    effectBonusValueMilitaryForceAbilityJunc,
    armySpecialAbilities
  );

  // Effects
  effects = staple.effects_effectsLoc(effects, combinedLoc, missingTextReplacements);
  effects = staple.effects_effectBonusValueUnitAbilityJunc(effects, effectBonusValueUnitAbilityJunc);
  effects = staple.effects_effectBonusValueUnitSetUnitAbilityJunc(effects, effectBonusValueUnitSetUnitAbilityJunc);
  effects = staple.effects_effectBonusValueMilitaryForceAbilityJunc(effects, effectBonusValueMilitaryForceAbilityJunc);

  return effects;
};

const stapleTables = (globalData, folder, techs) => {
  return new Promise((resolve) => {
    const readTable = (path) => {
      return JSON.parse(JSON.stringify(globalData.parsedData[folder].db[path]));
    };

    const missingTextReplacements = [];

    const combinedLoc = JSON.parse(JSON.stringify(globalData.parsedData[folder].text));

    const effects = stapleTablesEffects(readTable, combinedLoc, missingTextReplacements);

    if (techs) {
      stapleTablesTechs(folder, JSON.parse(JSON.stringify(effects)), readTable, combinedLoc);
    }

    let ancillaryToEffects = readTable('ancillary_to_effects_tables');
    let ancillaries = readTable('ancillaries_tables');
    let characterSkillLevelToAncillariesJunction = readTable('character_skill_level_to_ancillaries_junctions_tables');
    let characterSkillsToQuestAncillaries = readTable('character_skills_to_quest_ancillaries_tables');
    let characterSkillLevelToEffectsJunction = readTable('character_skill_level_to_effects_junctions_tables');
    let characterSkills = readTable('character_skills_tables');
    const characterSkillLevelDetails = readTable('character_skill_level_details_tables');
    let characterSkillNodes = readTable('character_skill_nodes_tables');
    const characterSkillNodeLinks = readTable('character_skill_node_links_tables');
    const characterSkillNodesSkillLocks = readTable('character_skill_nodes_skill_locks_tables');
    let cultures = readTable('cultures_tables');
    const culturesSubcultures = readTable('cultures_subcultures_tables');
    const factions = readTable('factions_tables');
    const factionAgentPermittedSubtypes = readTable('faction_agent_permitted_subtypes_tables');
    const characterSkillNodeSets = readTable('character_skill_node_sets_tables');

    let effectBundles = readTable('effect_bundles_tables');
    let effectBundlesToEffectsJunc = readTable('effect_bundles_to_effects_junctions_tables');

    // Ancillaries
    ancillaryToEffects = staple.ancillariesToEffects_effects(ancillaryToEffects, effects);
    ancillaries = staple.ancillaries_ancillariesToEffects(ancillaries, ancillaryToEffects);

    // Skills
    characterSkillLevelToAncillariesJunction = staple.characterSkillLevelToAncillariesJunction_ancillaries(
      characterSkillLevelToAncillariesJunction,
      ancillaries
    );
    characterSkillsToQuestAncillaries = staple.characterSkillsToQuestAncillaries_ancillaries(
      characterSkillsToQuestAncillaries,
      ancillaries
    );
    characterSkillLevelToEffectsJunction = staple.effects_characterSkillLevelToEffectsJunction(
      effects,
      characterSkillLevelToEffectsJunction,
      combinedLoc,
      missingTextReplacements
    );
    characterSkills = staple.characterSkills_characterSkillsLoc(characterSkills, combinedLoc, missingTextReplacements);
    characterSkills = staple.characterSkills_characterSkillLevelDetails(characterSkills, characterSkillLevelDetails);
    characterSkills = staple.characterSkills_characterSkillLevelToEffectsJunction(characterSkills, characterSkillLevelToEffectsJunction);
    characterSkills = staple.characterSkills_characterSkillLevelToAncillariesJunction(
      characterSkills,
      characterSkillLevelToAncillariesJunction
    );
    characterSkills = staple.characterSkills_characterSkillsToQuestAncillaries(characterSkills, characterSkillsToQuestAncillaries);
    if (folder.includes('3')) {
      const characterSkillsToLevelReachedCriterias = readTable('character_skills_to_level_reached_criterias_tables');
      characterSkills = staple3.characterSkills_characterSkillsToLevelReachedCriterias(
        characterSkills,
        characterSkillsToLevelReachedCriterias
      );
    }
    characterSkills = pruneDupeAbilities(characterSkills);

    // Skill Nodes
    characterSkillNodes = staple.characterSkillNodes_characterSkills(characterSkillNodes, characterSkills);
    characterSkillNodes = staple.characterSkillNodes_characterSkillNodeLinks(characterSkillNodes, characterSkillNodeLinks);
    characterSkillNodes = staple.characterSkillNodes_characterSkillNodesSkillLocks(characterSkillNodes, characterSkillNodesSkillLocks);

    // Cultures
    cultures = staple.cultures_culturesLoc(cultures, combinedLoc, missingTextReplacements);
    if (folder.includes('3')) {
      cultures = staple3.cultures_culturesSubcultures(cultures, culturesSubcultures);
    } else {
      cultures = staple.cultures_culturesSubcultures(cultures, culturesSubcultures);
    }
    cultures = staple.cultures_factions(cultures, factions);
    cultures = staple.cultures_factionAgentPermittedSubtypes(cultures, factionAgentPermittedSubtypes, folder);
    cultures = staple.cultures_characterSkillNodeSets(cultures, characterSkillNodeSets);

    let collatedNodeSets = collate_characterSkillNodes(characterSkillNodes, cultures);

    // WH3 attaches quest ancillaries to the agent instead of a skill node
    if (folder.includes('3')) {
      const characterAncillaryQuestUIDetails = readTable('character_ancillary_quest_ui_details_tables');
      collatedNodeSets = staple3.collatedNodeSets_characterAncillaryQuestUIDetails(
        collatedNodeSets,
        characterSkillNodeSets,
        characterAncillaryQuestUIDetails,
        ancillaries,
        combinedLoc
      );
    }

    // LL Faction effects
    effectBundlesToEffectsJunc = staple.effectBundlesToEffectsJunc_effects(effectBundlesToEffectsJunc, effects);
    effectBundles = staple.effectBundles_loc(effectBundles, combinedLoc);
    effectBundles = staple.effectBundles_effectBundlesToEffectsJunc(effectBundles, effectBundlesToEffectsJunc);
    // WH3 has a table to link effects to agent key, WH2 doesnt, so just guessing the agent key
    if (folder.includes('3')) {
      let factionStartingGeneralEffects = readTable('faction_starting_general_effects_tables');
      factionStartingGeneralEffects = staple3.factionStartingGeneralEffects_effectBundles(factionStartingGeneralEffects, effectBundles);
      collatedNodeSets = staple3.collatedNodeSets_factionStartingGeneralEffects(
        collatedNodeSets,
        characterSkillNodeSets,
        factionStartingGeneralEffects
      );
    } else {
      collatedNodeSets = staple.collatedNodeSets_effectBundles(collatedNodeSets, effectBundles);
    }

    const filteredNodeSets = filterNodeSets(collatedNodeSets);

    emptyDirSync(`./test/${folder}`);
    output_characterLists(folder, cultures, characterSkillNodeSets, combinedLoc);
    fse.outputJSON(`./test/${folder}/cultures.json`, cultures, { spaces: 2 });

    if (missingTextReplacements.length > 0) {
      log(`${folder} missing text replacements: ${missingTextReplacements}`, 'yellow');
    }

    output_characters(cultures, filteredNodeSets, folder);
    resolve();
  });
};

const stapleTablesTechs = (folder, effects, readTable, combinedLoc) => {
  let techs = readTable('technologies_tables');
  let techEffectsJunc = readTable('technology_effects_junction_tables');
  const techNodeLinks = readTable('technology_node_links_tables');
  let techNodeSets = readTable('technology_node_sets_tables');
  let techNodes = readTable('technology_nodes_tables');
  const techNodesToAncillariesJunc = readTable('technology_nodes_to_ancillaries_junctions_tables');
  const techRequiredBuildingJunc = readTable('technology_required_building_levels_junctions_tables');
  const techRequiredTechJunc = readTable('technology_required_technology_junctions_tables');
  const techScriptLockReason = readTable('technology_script_lock_reasons_tables');
  const techUiGroups = readTable('technology_ui_groups_tables');
  const techUiGroupsToTechNodesJunc = readTable('technology_ui_groups_to_technology_nodes_junctions_tables');

  techEffectsJunc = stapleTechs.techEffectsJunc_effects(techEffectsJunc, effects, combinedLoc);
  techs = stapleTechs.techs_techLoc(techs, combinedLoc);
  techs = stapleTechs.techs_techEffectsJunc(techs, techEffectsJunc);
  techs = stapleTechs.techs_techRequiredBuildingJunc(techs, techRequiredBuildingJunc, combinedLoc);
  techs = stapleTechs.techs_techRequiredTechJunc(techs, techRequiredTechJunc);
  techs = stapleTechs.techs_techScriptLockReason(techs, techScriptLockReason);
  techNodes = stapleTechs.techNodes_techs(techNodes, techs);
  techNodes = stapleTechs.techNodes_techNodeLinks(techNodes, techNodeLinks);
  techNodes = stapleTechs.techNodes_techNodesToAncillariesJunc(techNodes, techNodesToAncillariesJunc);
  const nodeSetLinksList = stapleTechs.nodeSetLinksList(techNodes, techNodeLinks);
  techNodeSets = stapleTechs.techNodeSets_techNodes(techNodeSets, techNodes);
  techNodeSets = stapleTechs.techNodeSets_nodeSetLinksList(techNodeSets, nodeSetLinksList);

  output_techs(techNodeSets, folder);
};

const stapleTablesOnlyTech = (globalData, folder) => {
  const readTable = (path) => {
    return JSON.parse(JSON.stringify(globalData.parsedData[folder].db[path]));
  };

  const missingTextReplacements = [];

  const combinedLoc = JSON.parse(JSON.stringify(globalData.parsedData[folder].text));

  const effects = stapleTablesEffects(readTable, combinedLoc, missingTextReplacements);

  stapleTablesTechs(folder, effects, readTable, combinedLoc);
};

export { stapleTables, stapleTablesOnlyTech };
