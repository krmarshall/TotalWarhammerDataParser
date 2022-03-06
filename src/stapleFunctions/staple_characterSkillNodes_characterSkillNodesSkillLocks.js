const staple_characterSkillNodes_characterSkillNodesSkillLocks = (characterSkillNodes, characterSkillNodesSkillLocks) => {
  const stapleTables = characterSkillNodes.map((node) => {
    const relatedSkillLocks = characterSkillNodesSkillLocks.filter((skillLock) => {
      return skillLock.character_skill_node === node.key;
    });
    relatedSkillLocks.forEach((skillLock) => {
      if (node.levels[skillLock.level - 1].blocks_character_skill_key === undefined) {
        node.levels[skillLock.level - 1].blocks_character_skill_key = [];
      }
      if (!node.levels[skillLock.level - 1].blocks_character_skill_key.includes(skillLock.character_skill)) {
        node.levels[skillLock.level - 1].blocks_character_skill_key.push(skillLock.character_skill);
      }
    });

    return { ...node };
  });
  return stapleTables;
};

export default staple_characterSkillNodes_characterSkillNodesSkillLocks;
