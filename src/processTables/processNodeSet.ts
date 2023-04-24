import { GlobalDataInterface, TableRecord } from '../interfaces/GlobalDataInterface';
import { SkillInterface, SkillLevelInterface } from '../interfaces/ProcessedTreeInterface';
import findImage from '../utils/findImage';
import log from '../utils/log';
import { parseBoolean, parseInteger } from '../utils/parseStringToTypes';
import processEffect from './processEffect';

const processNodeSet = (
  folder: string,
  globalData: GlobalDataInterface,
  nodeSet: TableRecord,
  subcultureKey: string,
  factionKeys: Set<string>
) => {
  const skillTree: Array<Array<SkillInterface>> = [[], [], [], [], [], []];
  const backgroundSkills: Array<SkillInterface> = [];

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
    // parent_required
    // parent_subset_required
    // right_arrow
    // boxed

    // SkillLevel refs
    // blocks_character_skill_key
  });

  return { skillTree, backgroundSkills };
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
