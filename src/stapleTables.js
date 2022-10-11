import { emptyDirSync } from 'fs-extra';
import fse from 'fs-extra';
import * as staple from './stapleFunctions/index.js';
import * as staple3 from './stapleFunctions3/index.js';
import { output_characters, collate_characterSkillNodes, filterNodeSets, output_characterLists } from './otherFunctions/index.js';

const stapleTables = (folder) => {
  return new Promise((resolve) => {
    const readJson = (path) => {
      return JSON.parse(fse.readFileSync(`./parsed_files/${folder}/${path}`, 'utf-8'));
    };

    const missingTextReplacements = [];

    const combinedLoc = readJson('text/db/combinedLoc.json');
    let unitAttributes = readJson('db/unit_attributes_tables.json');
    let specialAbilityPhaseAttributeEffects = readJson('db/special_ability_phase_attribute_effects_tables.json');
    let specialAbilityPhaseStatEffects = readJson('db/special_ability_phase_stat_effects_tables.json');
    const uiUnitStats = readJson('db/ui_unit_stats_tables.json');
    let specialAbilityPhases = readJson('db/special_ability_phases_tables.json');
    let specialAbilityToSpecialAbilityPhaseJuncs = readJson('db/special_ability_to_special_ability_phase_junctions_tables.json');
    let unitSpecialAbilities = readJson('db/unit_special_abilities_tables.json');
    let effects = readJson('db/effects_tables.json');
    let ancillaryToEffects = readJson('db/ancillary_to_effects_tables.json');
    let ancillaries = readJson('db/ancillaries_tables.json');
    let characterSkillLevelToAncillariesJunction = readJson('db/character_skill_level_to_ancillaries_junctions_tables.json');
    let characterSkillsToQuestAncillaries = readJson('db/character_skills_to_quest_ancillaries_tables.json');
    let characterSkillLevelToEffectsJunction = readJson('db/character_skill_level_to_effects_junctions_tables.json');
    let characterSkills = readJson('db/character_skills_tables.json');
    const characterSkillLevelDetails = readJson('db/character_skill_level_details_tables.json');
    let characterSkillNodes = readJson('db/character_skill_nodes_tables.json');
    const characterSkillNodeLinks = readJson('db/character_skill_node_links_tables.json');
    const characterSkillNodesSkillLocks = readJson('db/character_skill_nodes_skill_locks_tables.json');
    let cultures = readJson('db/cultures_tables.json');
    const culturesSubcultures = readJson('db/cultures_subcultures_tables.json');
    const factions = readJson('db/factions_tables.json');
    const factionAgentPermittedSubtypes = readJson('db/faction_agent_permitted_subtypes_tables.json');
    const characterSkillNodeSets = readJson('db/character_skill_node_sets_tables.json');
    let unitAbilitiesAdditionalUiEffects = readJson('db/unit_abilities_additional_ui_effects_tables.json');
    let unitAbilitiesToAdditionalUiEffectsJuncs = readJson('db/unit_abilities_to_additional_ui_effects_juncs_tables.json');
    let unitAbilityTypes = readJson('db/unit_ability_types_tables.json');
    let unitAbilities = readJson('db/unit_abilities_tables.json');
    let effectBonusValueUnitAbilityJunc = readJson('db/effect_bonus_value_unit_ability_junctions_tables.json');
    let battleVortexes = readJson('db/battle_vortexs_tables.json');
    let projectileBombardments = readJson('db/projectile_bombardments_tables.json');
    let projectiles = readJson('db/projectiles_tables.json');
    let projectilesExplosions = readJson('db/projectiles_explosions_tables.json');
    let specialAbilityAutoDeactivateFlags = readJson('db/special_ability_to_auto_deactivate_flags_tables.json');
    let specialAbilityInvalidTargetFlags = readJson('db/special_ability_to_invalid_target_flags_tables.json');
    let unitSetUnitAbilityJunc = readJson('db/unit_set_unit_ability_junctions_tables.json');
    let effectBonusValueUnitSetUnitAbilityJunc = readJson('db/effect_bonus_value_unit_set_unit_ability_junctions_tables.json');
    let armySpecialAbilities = readJson('db/army_special_abilities_tables.json');
    let effectBonusValueMilitaryForceAbilityJunc = readJson('db/effect_bonus_value_military_force_ability_junctions_tables.json');

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
    effects = staple.effects_effectsLoc(effects, combinedLoc, missingTextReplacements);
    effects = staple.effects_effectBonusValueUnitAbilityJunc(effects, effectBonusValueUnitAbilityJunc);
    effects = staple.effects_effectBonusValueUnitSetUnitAbilityJunc(effects, effectBonusValueUnitSetUnitAbilityJunc);
    effects = staple.effects_effectBonusValueMilitaryForceAbilityJunc(effects, effectBonusValueMilitaryForceAbilityJunc);
    ancillaryToEffects = staple.ancillariesToEffects_effects(ancillaryToEffects, effects);
    ancillaries = staple.ancillaries_ancillariesToEffects(ancillaries, ancillaryToEffects);
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
      const characterSkillsToLevelReachedCriterias = readJson('db/character_skills_to_level_reached_criterias_tables.json');
      characterSkills = staple3.characterSkills_characterSkillsToLevelReachedCriterias(
        characterSkills,
        characterSkillsToLevelReachedCriterias
      );
    }
    characterSkillNodes = staple.characterSkillNodes_characterSkills(characterSkillNodes, characterSkills);
    characterSkillNodes = staple.characterSkillNodes_characterSkillNodeLinks(characterSkillNodes, characterSkillNodeLinks);
    characterSkillNodes = staple.characterSkillNodes_characterSkillNodesSkillLocks(characterSkillNodes, characterSkillNodesSkillLocks);
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
      const characterAncillaryQuestUIDetails = readJson('db/character_ancillary_quest_ui_details_tables.json');
      collatedNodeSets = staple3.collatedNodeSets_characterAncillaryQuestUIDetails(
        collatedNodeSets,
        characterSkillNodeSets,
        characterAncillaryQuestUIDetails,
        ancillaries,
        combinedLoc
      );
    }

    const filteredNodeSets = filterNodeSets(collatedNodeSets);

    emptyDirSync(`./test/${folder}`);
    output_characterLists(folder, cultures, characterSkillNodeSets, combinedLoc);
    fse.outputJSON(`./test/${folder}/cultures.json`, cultures, { spaces: 2 });

    if (missingTextReplacements.length > 0) {
      console.log('\x1b[33m', `\b${folder} missing text replacements: ${missingTextReplacements}`, '\x1b[0m');
    }

    output_characters(cultures, filteredNodeSets, folder);
    resolve();
  });
};

export { stapleTables };
