import nodeSetsPrune from '../pruneLists/nodeSetsPrune.js';

const cultures_characterSkillNodeSets = (cultures, characterSkillNodeSets) => {
  const stapledTable = cultures.map((culture) => {
    const relatedNodeSets = characterSkillNodeSets.filter((nodeSet) => {
      return culture.agents.includes(nodeSet.agent_subtype_key);
    });
    culture.lordNodeSets = [];
    culture.heroNodeSets = [];
    relatedNodeSets.forEach((nodeSet) => {
      if (nodeSet.agent_key === 'general' && !culture.lordNodeSets.includes(nodeSet.key) && !nodeSetsPrune.includes(nodeSet.key)) {
        culture.lordNodeSets.push(nodeSet.key);
      } else if (nodeSet.agent_key !== 'general' && !culture.heroNodeSets.includes(nodeSet.key) && !nodeSetsPrune.includes(nodeSet.key)) {
        culture.heroNodeSets.push(nodeSet.key);
      }
    });

    return { ...culture };
  });
  return stapledTable;
};

export default cultures_characterSkillNodeSets;
