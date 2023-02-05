import { nodeSetsPrune, nodeSetsPrune2, nodeSetsPrune3 } from '../lists/nodeSetsPrune.js';
import { cultureMap } from '../lists/cultureMap.js';

const cultures_characterSkillNodeSets = (folder, cultures, characterSkillNodeSets) => {
  const gamePruneList = folder.includes('2') ? nodeSetsPrune2 : nodeSetsPrune3;
  const stapledTable = cultures.map((culture) => {
    const relatedNodeSets = characterSkillNodeSets.filter((nodeSet) => {
      return culture.agents?.includes(nodeSet.agent_subtype_key);
    });
    culture.lordNodeSets = [];
    culture.heroNodeSets = [];
    relatedNodeSets.forEach((nodeSet) => {
      if (nodeSet.agent_key === 'general' && !culture.lordNodeSets.includes(nodeSet.key) && !nodeSetsPrune.includes(nodeSet.key)) {
        const pruneChar = gamePruneList.find(
          (pruneChar) => pruneChar.faction === cultureMap[culture.key] && pruneChar.nodeSetKey === nodeSet.key
        );
        if (pruneChar === undefined) {
          culture.lordNodeSets.push(nodeSet.key);
        }
      } else if (nodeSet.agent_key !== 'general' && !culture.heroNodeSets.includes(nodeSet.key) && !nodeSetsPrune.includes(nodeSet.key)) {
        const pruneChar = gamePruneList.find(
          (pruneChar) => pruneChar.faction === cultureMap[culture.key] && pruneChar.nodeSetKey === nodeSet.key
        );
        if (pruneChar === undefined) {
          culture.heroNodeSets.push(nodeSet.key);
        }
      }
    });

    return { ...culture };
  });
  return stapledTable;
};

export default cultures_characterSkillNodeSets;
