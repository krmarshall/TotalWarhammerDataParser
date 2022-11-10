const nodeSetPruneList = ['campaign_key', 'technology_category', 'subculture', 'colour_hex'];

const techNodeSets_techNodes = (techNodeSets, techNodes) => {
  const nodeMap = {};
  techNodes.forEach((node) => {
    if (nodeMap[node.technology_node_set] === undefined) {
      nodeMap[node.technology_node_set] = [];
    }
    nodeMap[node.technology_node_set].push(node);
  });

  const stapledTable = techNodeSets.map((nodeSet) => {
    nodeSetPruneList.forEach((prune) => delete nodeSet[prune]);

    nodeSet.tree = [];

    const relatedNodes = nodeMap[nodeSet.key];
    if (relatedNodes !== undefined) {
      relatedNodes.forEach((node) => {
        if (nodeSet.tree[node.indent] === undefined) {
          nodeSet.tree[node.indent] = [];
        }
        nodeSet.tree[node.indent][node.tier] = node;
      });
    }
    return { ...nodeSet };
  });
  return stapledTable;
};

export default techNodeSets_techNodes;
