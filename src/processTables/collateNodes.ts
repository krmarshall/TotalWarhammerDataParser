import { ItemInterface, SkillInterface } from '../interfaces/ProcessedTreeInterface';

const collateNodes = (completeNodes: Array<SkillInterface>, subcultureKey: string, factionKeys: Set<string>) => {
  const skillTree: Array<Array<SkillInterface>> = [[], [], [], [], [], []];
  const backgroundSkills: Array<SkillInterface> = [];
  const items: Array<ItemInterface> = [];

  nodeFactionPrune.forEach((prune) => factionKeys.delete(prune));
  completeNodes.forEach((completeNode) => {
    if (completeNode.use_quest_for_prefix) {
      // push to items
    } else if (completeNode.character_skill_key === 'wh3_main_skill_agent_action_success_scaling') {
      // Dont add
    } else if (completeNode.is_background_skill || !completeNode.visible_in_ui) {
      backgroundSkills.push(completeNode);
    } else if (
      (completeNode.subculture && completeNode.subculture !== subcultureKey) ||
      (completeNode.faction && !factionKeys.has(completeNode.faction))
    ) {
      // Dont add
    } else if (completeNode.indent <= 5) {
      if (skillTree[completeNode.indent] === undefined) skillTree[completeNode.indent] = [];
      skillTree[completeNode.indent][completeNode.tier] = completeNode;
    }
  });

  // Clean null array elements
  skillTree.filter((indent) => indent !== null);
  skillTree.map((tier) => tier.filter((skill) => skill !== null));
  return { skillTree, backgroundSkills, items };
};

export default collateNodes;

const nodeFactionPrune = ['wh2_main_lzd_last_defenders', 'wh2_main_def_ssildra_tor', 'wh2_main_def_cult_of_pleasure'];
