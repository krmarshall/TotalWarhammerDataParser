const staple_characterSkillNodes_characterSkillNodeLinks = (characterSkillNodes, characterSkillNodeLinks) => {
  const stapledTable = characterSkillNodes.map((node) => {
    const relatedLinksImParent = [];
    const relatedLinksImChild = [];

    characterSkillNodeLinks.forEach((nodeLink) => {
      if (nodeLink.child_key === node.key) {
        relatedLinksImChild.push(nodeLink);
      } else if (nodeLink.parent_key === node.key) {
        relatedLinksImParent.push(nodeLink);
      }
    });
    // Add parent requirements to each skill
    const parentRequired = [];
    const parentSubsetRequired = [];
    relatedLinksImChild.forEach((link) => {
      if (link.link_type === 'REQUIRED') {
        parentRequired.push(link.parent_key);
      } else if (link.link_type === 'SUBSET_REQUIRED') {
        parentSubsetRequired.push(link.parent_key);
      }
    });
    node.parent_required = parentRequired.length ? parentRequired : undefined;
    node.parent_subset_required = parentSubsetRequired.length ? parentSubsetRequired : undefined;

    // Add meta information on if a skill is boxed (part of a subset), has an arrow (is required for another skill)
    if (relatedLinksImParent.length) {
      relatedLinksImParent.forEach((link) => {
        if (link.link_type === 'REQUIRED') {
          node.right_arrow = true;
        } else if (link.link_type === 'SUBSET_REQUIRED') {
          node.boxed = true;
        }
      });
    }
    return { ...node };
  });

  // After adding all the node links, find any nodes with a subset required, and give the last subset required the right_arrow property
  const metaTable = stapledTable.filter((node) => {
    return node.parent_subset_required?.length;
  });
  metaTable.forEach((node) => {
    const lastSubsetKey = node.parent_subset_required[node.parent_subset_required.length - 1];
    const lastSubsetIndex = stapledTable.findIndex((node) => {
      return node.key === lastSubsetKey;
    });
    stapledTable[lastSubsetIndex].right_arrow = true;
  });

  return stapledTable;
};

export default staple_characterSkillNodes_characterSkillNodeLinks;
