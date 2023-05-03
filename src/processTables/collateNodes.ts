import { ItemInterface, SkillInterface } from '../interfaces/ProcessedTreeInterface';

const collateNodes = (
  completeNodes: Array<SkillInterface>,
  itemsArg: Array<ItemInterface>,
  subcultureKey: string,
  factionKeys: Set<string>
) => {
  let skillTree: Array<Array<SkillInterface>> = [[], [], [], [], [], []];
  const backgroundSkills: Array<SkillInterface> = [];
  const items: Array<ItemInterface> = [...itemsArg];

  nodeFactionPrune.forEach((prune) => factionKeys.delete(prune));
  completeNodes.forEach((completeNode) => {
    if (completeNode.character_skill_key === 'wh3_main_skill_agent_action_success_scaling') {
      // Dont add
    } else if (completeNode.use_quest_for_prefix) {
      // Dont add (wh2 quest item)
    } else if (completeNode.is_background_skill || !completeNode.visible_in_ui) {
      if (completeNode.use_quest_for_prefix !== undefined) delete completeNode.use_quest_for_prefix;
      backgroundSkills.push(completeNode);
    } else if (
      (completeNode.subculture && completeNode.subculture !== subcultureKey) ||
      (completeNode.faction && !factionKeys.has(completeNode.faction))
    ) {
      // Dont add
    } else if (completeNode.indent <= 5) {
      if (skillTree[completeNode.indent] === undefined) skillTree[completeNode.indent] = [];
      if (completeNode.use_quest_for_prefix !== undefined) delete completeNode.use_quest_for_prefix;
      skillTree[completeNode.indent][completeNode.tier] = completeNode;
    }
  });

  // Clean null array elements
  skillTree = skillTree.filter((indent) => indent !== null);
  skillTree = skillTree.map((tier) => tier.filter((skill) => skill !== null));

  items.sort((a, b) => (a.unlocked_at_rank ?? 0) - (b.unlocked_at_rank ?? 0));
  return { skillTree, backgroundSkills, items };
};

export default collateNodes;

const nodeFactionPrune = ['wh2_main_lzd_last_defenders', 'wh2_main_def_ssildra_tor', 'wh2_main_def_cult_of_pleasure'];
