const techNodes_techNodeLinks = (techNodes, techNodeLinks) => {
  const linksMap = {};
  techNodeLinks.forEach((link) => {
    if (linksMap[link.child_key] === undefined) {
      linksMap[link.child_key] = [];
    }
    linksMap[link.child_key].push(link);
  });

  const stapledTable = techNodes.map((node) => {
    const relatedLinks = linksMap[node.key];
    if (relatedLinks !== undefined) {
      node.requires_parent_nodes = relatedLinks.map((link) => link.parent_key);
    }
    return { ...node };
  });
  return stapledTable;
};

export default techNodes_techNodeLinks;
