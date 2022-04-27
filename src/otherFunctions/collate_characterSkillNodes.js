import wh2QuestNodePrune from '../pruneLists/wh2QuestNodePrune.js';

const collate_characterSkillNodes = (characterSkillNodes, cultures) => {
  const wantedNodeSets = [];
  cultures.forEach((culture) => {
    wantedNodeSets.push(...culture.lordNodeSets, ...culture.heroNodeSets);
  });

  const collatedNodeSets = {};
  characterSkillNodes.forEach((skillNode) => {
    if (wantedNodeSets.includes(skillNode.character_skill_node_set_key)) {
      if (collatedNodeSets[skillNode.character_skill_node_set_key] === undefined) {
        collatedNodeSets[skillNode.character_skill_node_set_key] = {};
        // For some reason there are a ton of skills using hidden indents above 6, even tho thats the purpose of 6?
        collatedNodeSets[skillNode.character_skill_node_set_key].skillTree = [[], [], [], [], [], []];

        const keyName = skillNode.character_skill_node_set_key.split('node_set_');
        collatedNodeSets[skillNode.character_skill_node_set_key].key = keyName[keyName.length - 1];
      }

      // For WH2 quest items in the skilltree push them to the items array instead.
      if (skillNode.use_quest_for_prefix) {
        if (collatedNodeSets[skillNode.character_skill_node_set_key].items === undefined) {
          collatedNodeSets[skillNode.character_skill_node_set_key].items = [];
        }
        const tempKey = skillNode.character_skill_node_set_key;
        wh2QuestNodePrune.forEach((prune) => {
          delete skillNode[prune];
        });
        skillNode.effects = skillNode.levels[0].effects;
        delete skillNode.levels;
        collatedNodeSets[tempKey].items.push(skillNode);

        // Similarly push background skills into their array instead of the skilltree.
      } else if (skillNode.is_background_skill || !skillNode.visible_in_ui) {
        if (collatedNodeSets[skillNode.character_skill_node_set_key].backgroundSkills === undefined) {
          collatedNodeSets[skillNode.character_skill_node_set_key].backgroundSkills = [];
        }
        collatedNodeSets[skillNode.character_skill_node_set_key].backgroundSkills.push(skillNode);

        // If neither of the above add it to the skilltree.
      } else {
        if (collatedNodeSets[skillNode.character_skill_node_set_key].skillTree[skillNode.indent] === undefined) {
          collatedNodeSets[skillNode.character_skill_node_set_key].skillTree[skillNode.indent] = [];
        }
        collatedNodeSets[skillNode.character_skill_node_set_key].skillTree[skillNode.indent][skillNode.tier] = skillNode;
        delete collatedNodeSets[skillNode.character_skill_node_set_key].skillTree[skillNode.indent][skillNode.tier]
          .character_skill_node_set_key;
      }
    }
  });
  return collatedNodeSets;
};

export default collate_characterSkillNodes;
