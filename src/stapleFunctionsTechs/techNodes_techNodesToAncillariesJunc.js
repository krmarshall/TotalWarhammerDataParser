const techNodes_techNodesToAncillariesJunc = (techNodes, techNodesToAncillariesJunc) => {
  const stapledTable = techNodes.map((node) => {
    const relatedAnc = techNodesToAncillariesJunc.find((anc) => anc.technology_node === node.key);
    // Might overhaul ancillaries for skill trees to do them properly, if/when i do that this should change.
    if (relatedAnc !== undefined) {
      node.ancillary = relatedAnc.ancillary;
    }
    return { ...node };
  });
  return stapledTable;
};

export default techNodes_techNodesToAncillariesJunc;
