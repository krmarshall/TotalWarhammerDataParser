const characterSkillNodes_characterSkillNodesSkillLocks = (characterSkillNodes, characterSkillNodesSkillLocks) => {
  const skillNodeLocksMap = {};
  characterSkillNodesSkillLocks.forEach((nodeLock) => {
    if (skillNodeLocksMap[nodeLock.character_skill] === undefined) {
      skillNodeLocksMap[nodeLock.character_skill] = [];
    }
    skillNodeLocksMap[nodeLock.character_skill].push(nodeLock);
  });

  const stapleTables = characterSkillNodes.map((node) => {
    const relatedSkillLocks = skillNodeLocksMap[node.character_skill_key];

    if (relatedSkillLocks !== undefined) {
      relatedSkillLocks.forEach((skillLock) => {
        if (node.levels[skillLock.level - 1].blocks_character_skill_key === undefined) {
          node.levels[skillLock.level - 1].blocks_character_skill_key = [];
        }
        if (!node.levels[skillLock.level - 1].blocks_character_skill_key.includes(skillLock.character_skill_node)) {
          node.levels[skillLock.level - 1].blocks_character_skill_key.push(skillLock.character_skill_node);
        }
      });
    }

    return { ...node };
  });
  return stapleTables;
};

export default characterSkillNodes_characterSkillNodesSkillLocks;
