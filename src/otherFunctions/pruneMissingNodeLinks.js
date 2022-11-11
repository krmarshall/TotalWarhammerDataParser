const pruneMissingNodeLinks = (techNodeSets) => {
  const prunedTable = techNodeSets.map((nodeSet) => {
    const nodeKeys = {};
    nodeSet.tree.forEach((row) => {
      row?.forEach((node) => {
        if (node !== null) {
          nodeKeys[node.key] = node.key;
        }
      });
    });

    const prunedLinks = [];
    nodeSet.node_links.forEach((link) => {
      if (nodeKeys[link.parent_key] !== undefined && nodeKeys[link.child_key] !== undefined) {
        prunedLinks.push(link);
      }
    });
    nodeSet.node_links = prunedLinks;

    return { ...nodeSet };
  });
  return prunedTable;
};

export default pruneMissingNodeLinks;
