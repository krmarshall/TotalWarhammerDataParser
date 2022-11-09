const techNodeSets_nodeSetLinksList = (techNodeSets, nodeSetLinksList) => {
  const stapledTable = techNodeSets.map((nodeSet) => {
    nodeSet.node_links = [];

    const relatedLinks = nodeSetLinksList[nodeSet.key];
    if (relatedLinks !== undefined) {
      nodeSet.node_links = relatedLinks;
    }
    return { ...nodeSet };
  });
  return stapledTable;
};

export default techNodeSets_nodeSetLinksList;
