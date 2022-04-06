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
        collatedNodeSets[skillNode.character_skill_node_set_key].skillTree = [[], [], [], [], [], [], []];

        const keyName = skillNode.character_skill_node_set_key.split('node_set_');
        collatedNodeSets[skillNode.character_skill_node_set_key].key = keyName[keyName.length - 1];
      }

      if (collatedNodeSets[skillNode.character_skill_node_set_key].skillTree[skillNode.indent] === undefined) {
        collatedNodeSets[skillNode.character_skill_node_set_key].skillTree[skillNode.indent] = [];
      }
      collatedNodeSets[skillNode.character_skill_node_set_key].skillTree[skillNode.indent][skillNode.tier] = skillNode;
      delete collatedNodeSets[skillNode.character_skill_node_set_key].skillTree[skillNode.indent][skillNode.tier]
        .character_skill_node_set_key;

      // if (skillNode.indent <= 6) {
      //   collatedNodeSets[skillNode.character_skill_node_set_key].skillTree[skillNode.indent][skillNode.tier] = skillNode;
      //   delete collatedNodeSets[skillNode.character_skill_node_set_key].skillTree[skillNode.indent][skillNode.tier]
      //     .character_skill_node_set_key;
      // }
    }
  });
  return collatedNodeSets;
};

export default collate_characterSkillNodes;
