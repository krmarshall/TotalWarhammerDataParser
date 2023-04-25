import { GlobalDataInterface, TableRecord } from '../interfaces/GlobalDataInterface';
import { SkillInterface, SkillLevelInterface } from '../interfaces/ProcessedTreeInterface';
import findImage from '../utils/findImage';
import log from '../utils/log';
import { parseBoolean, parseInteger } from '../utils/parseStringToTypes';
import collateNodes from './collateNodes';
import processEffect from './processEffect';

const processNodeSet = (
  folder: string,
  globalData: GlobalDataInterface,
  nodeSet: TableRecord,
  subcultureKey: string,
  factionKeys: Set<string>
) => {
  const completeNodes: Array<SkillInterface> = [];

  const skillNodeKeys: { [key: string]: boolean } = {};
  nodeSet.foreignRefs?.character_skill_nodes?.forEach((skillNode) => (skillNodeKeys[skillNode.key] = true));
  const subsetRequiredMap: { [key: string]: Array<SkillInterface> } = {};

  nodeSet.foreignRefs?.character_skill_nodes?.forEach((skillNode) => {
    const skill = skillNode.localRefs?.character_skills as TableRecord;
    const returnSkill: SkillInterface = {
      key: skillNode.key,
      image_path: findSkillImage(folder, globalData, skill.image_path),
      character_skill_key: skillNode.character_skill_key,
      tier: parseInteger(skillNode.tier),
      indent: parseInteger(skillNode.indent),
      points_on_creation: parseInteger(skillNode.points_on_creation),
      required_num_parents: parseInteger(skillNode.required_num_parents),
      visible_in_ui: parseBoolean(skillNode.visible_in_ui),
      is_background_skill: parseBoolean(skill.is_background_skill),
      localised_name: skill.localised_name,
      localised_description: skill.localised_description,
    };

    if (skillNode.subculture !== '') returnSkill.subculture = skillNode.subculture;
    if (skillNode.faction_key !== '') returnSkill.faction = skillNode.faction_key;

    // Skills refs
    // character_skill_level_to_effects_junctions
    skill.foreignRefs?.character_skill_level_to_effects_junctions?.forEach((effectJunc) => {
      const skillLevel = parseInteger(effectJunc.level) - 1;
      returnSkill.levels = checkSkillLevelExists(returnSkill.levels, skillLevel);
      returnSkill.levels[skillLevel]?.effects?.push(
        processEffect(folder, globalData, effectJunc.localRefs?.effects as TableRecord, effectJunc.value, effectJunc.scope)
      );
    });
    // character_skill_level_to_ancillaries_junctions
    skill.foreignRefs?.character_skill_level_to_ancillaries_junctions?.forEach((ancillaryJunc) => {
      const ancillaryEffects = ancillaryJunc.localRefs?.ancillaries?.localRefs?.ancillary_info?.foreignRefs?.ancillary_to_effects;
      if (ancillaryEffects !== undefined) {
        ancillaryEffects.forEach((effect) => {
          const skillLevel = parseInteger(effect.level) - 1;
          returnSkill.levels = checkSkillLevelExists(returnSkill.levels, skillLevel);
          returnSkill.levels[skillLevel]?.effects?.push(
            processEffect(folder, globalData, effect.localRefs?.effects as TableRecord, effect.value, effect.effect_scope)
          );
        });
      }
    });
    // character_skills_to_quest_ancillaries
    skill.foreignRefs?.character_skills_to_quest_ancillaries?.forEach((quest) => {
      const breakpoint = skill;
      // To Do WH2 Quest Items
    });
    // character_skill_level_details
    skill.foreignRefs?.character_skill_level_details?.forEach((skillLevelDetails) => {
      const skillLevel = parseInteger(skillLevelDetails.level) - 1;
      if (returnSkill.levels?.[skillLevel] === undefined) {
        log(`Skill level unlocked at rank missing its skill level: ${returnSkill.key}`, 'red');
      } else {
        returnSkill.levels[skillLevel].unlocked_at_rank = parseInteger(skillLevelDetails.unlocked_at_rank) + 1;
      }
    });
    // character_skills_to_level_reached_criterias WH3
    skill.foreignRefs?.character_skills_to_level_reached_criterias?.forEach((levelReached) => {
      if (levelReached.character_level === '0') {
        returnSkill.points_on_creation = 1;
      } else {
        const upgradeToSkillLevel = parseInteger(levelReached.upgrade_to_skill_level) - 1;
        if (returnSkill.levels?.[upgradeToSkillLevel] === undefined) {
          log(`Level reached auto skill unlock missing its skill level: ${returnSkill.key}`, 'red');
        } else {
          returnSkill.levels[upgradeToSkillLevel].auto_unlock_at_rank = parseInteger(levelReached.character_level) + 1;
          delete returnSkill.levels?.[upgradeToSkillLevel].unlocked_at_rank;
        }
      }
    });
    // character_skill_nodes_skill_locks
    skill.foreignRefs?.character_skill_nodes_skill_locks?.forEach((lock) => {
      const skillLevel = parseInteger(lock.level) - 1;
      if (returnSkill.levels?.[skillLevel] === undefined) {
        log(`Skill node lock missing its skill level: ${returnSkill.key}`, 'red');
      } else if (skillNodeKeys[lock.character_skill_node] === true) {
        if (returnSkill.levels[skillLevel].blocks_skill_node_keys === undefined) returnSkill.levels[skillLevel].blocks_skill_node_keys = [];
        if (!returnSkill.levels[skillLevel].blocks_skill_node_keys?.includes(lock.character_skill_node)) {
          returnSkill.levels[skillLevel].blocks_skill_node_keys?.push(lock.character_skill_node);
        }
      }
    });
    // character_skill_node_links
    const parent_required: Array<string> = [];
    const parent_subset_required: Array<string> = [];
    skillNode.foreignRefs?.character_skill_node_links?.forEach((link) => {
      if (skillNodeKeys[link.parent_key] === undefined || skillNodeKeys[link.child_key] === undefined) {
        // If one of the nodes the links refer to isnt in the node set then ignore it
      } else {
        if (skillNode.key === link.parent_key) {
          if (link.link_type === 'REQUIRED') {
            returnSkill.right_arrow = true;
          }
          if (link.link_type === 'SUBSET_REQUIRED') {
            if (subsetRequiredMap[link.child_key] === undefined) subsetRequiredMap[link.child_key] = [];
            subsetRequiredMap[link.child_key].push(returnSkill);
          }
        }
        if (skillNode.key === link.child_key) {
          if (link.link_type === 'REQUIRED') {
            parent_required.push(link.parent_key);
          }
          if (link.link_type === 'SUBSET_REQUIRED') {
            parent_subset_required.push(link.parent_key);
          }
        }
      }
    });
    if (parent_required.length > 0) returnSkill.parent_required = parent_required;
    if (parent_subset_required.length > 0) returnSkill.parent_subset_required = parent_subset_required;

    completeNodes.push(returnSkill);
  });

  // After all nodes are processed go through subset_required children, give their highest tier parent right_arrow
  Object.keys(subsetRequiredMap).forEach((subsetKey) => {
    const subsetRequiredNodes = subsetRequiredMap[subsetKey];
    let highest = subsetRequiredNodes[0];
    for (let i = 0; i < subsetRequiredNodes.length; i++) {
      if (subsetRequiredNodes[i].tier > highest.tier) {
        highest = subsetRequiredNodes[i];
      }
    }
    highest.right_arrow = true;

    // Also give each parent node boxed if there are more than 1 of them
    if (subsetRequiredNodes.length > 1) {
      subsetRequiredNodes.forEach((node) => (node.boxed = true));
    }
  });

  return collateNodes(completeNodes, subcultureKey, factionKeys);
};

export default processNodeSet;

const findSkillImage = (folder: string, globalData: GlobalDataInterface, image_path: string) => {
  const icon = image_path.replace('.png', '').trim();
  const searchArray = [
    `campaign_ui/skills/${icon}`,
    `campaign_ui/skills/${icon.toLowerCase()}`,
    // WH2 has pretty much all the skill icons in campaign_ui, WH3 has many of the spells/abilities under battle_ui
    `battle_ui/ability_icons/${icon}`,
    `battle_ui/ability_icons/${icon.toLowerCase()}`,
    // SFO2 some ability icons have _active in the icon_name, but not actual image name
    `campaign_ui/skills/${icon.replace('_active', '')}`,
    `campaign_ui/skills/${icon.replace('_active', '').toLowerCase()}`,
  ];

  return findImage(folder, globalData, searchArray, icon);
};

const checkSkillLevelExists = (levels: Array<SkillLevelInterface> | undefined, skillLevel: number) => {
  if (levels === undefined) levels = [];
  if (levels[skillLevel] === undefined) levels[skillLevel] = {};
  if (levels[skillLevel].effects === undefined) levels[skillLevel].effects = [];
  return levels;
};
