const characterSkillNodes_characterSkillNodesSkillLocks = (characterSkillNodes, characterSkillNodesSkillLocks) => {
  const stapleTables = characterSkillNodes.map((node) => {
    const relatedSkillLocks = characterSkillNodesSkillLocks.filter((skillLock) => {
      return skillLock.character_skill === node.character_skill_key;
    });
    relatedSkillLocks.forEach((skillLock) => {
      if (node.levels[skillLock.level - 1].blocks_character_skill_key === undefined) {
        node.levels[skillLock.level - 1].blocks_character_skill_key = [];
      }
      if (!node.levels[skillLock.level - 1].blocks_character_skill_key.includes(skillLock.character_skill_node)) {
        node.levels[skillLock.level - 1].blocks_character_skill_key.push(skillLock.character_skill_node);
      }
    });

    return { ...node };
  });
  return stapleTables;
};

export default characterSkillNodes_characterSkillNodesSkillLocks;
