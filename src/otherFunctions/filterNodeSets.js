const filterNodeSets = (characterNodeSets) => {
  const nodeSetsKeys = Object.keys(characterNodeSets);
  const returnObject = {};
  nodeSetsKeys.forEach((nodeSetKey) => {
    const nodeSet = characterNodeSets[nodeSetKey];
    if (nodeSet.skillTree.length > 6) {
      const filteredIndentTree = nodeSet.skillTree.filter((skillLine) => {
        return skillLine !== null;
      });
      nodeSet.skillTree = filteredIndentTree;
    }
    const filteredTierTree = nodeSet.skillTree.map((skillLine) => {
      return skillLine.filter((skill) => {
        return skill !== null;
      });
    });
    nodeSet.skillTree = filteredTierTree;
    returnObject[nodeSetKey] = { ...nodeSet };
  });
  return returnObject;
};

export default filterNodeSets;
