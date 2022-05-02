const prepTables = (characterSkillNodeLinks) => {
  const parentTable = {};
  const childTable = {};

  characterSkillNodeLinks.forEach((nodeLink) => {
    let parentInserted = false;
    for (let i = 0; !parentInserted; i++) {
      if (parentTable[`${nodeLink.parent_key}|${i}`] === undefined) {
        parentTable[`${nodeLink.parent_key}|${i}`] = nodeLink;
        parentInserted = true;
      }
    }

    let childInserted = false;
    for (let i = 0; !childInserted; i++) {
      if (childTable[`${nodeLink.child_key}|${i}`] === undefined) {
        childTable[`${nodeLink.child_key}|${i}`] = nodeLink;
        childInserted = true;
      }
    }
  });
  return { parentTable, childTable };
};

const characterSkillNodes_characterSkillNodeLinks = (characterSkillNodes, characterSkillNodeLinks) => {
  const { parentTable, childTable } = prepTables(characterSkillNodeLinks);

  const stapledTable = characterSkillNodes.map((node) => {
    const relatedLinksImParent = [];
    const relatedLinksImChild = [];

    // Below commented forEach does the same thing as all this object shenanigans, but a LOT slower. Saved ~7s when implemented, prob more with added mods.
    let allParentsFound = false;
    for (let i = 0; !allParentsFound; i++) {
      if (parentTable[`${node.key}|${i}`] !== undefined) {
        relatedLinksImParent.push(parentTable[`${node.key}|${i}`]);
      } else {
        allParentsFound = true;
      }
    }

    let allChildrenFound = false;
    for (let i = 0; !allChildrenFound; i++) {
      if (childTable[`${node.key}|${i}`] !== undefined) {
        relatedLinksImChild.push(childTable[`${node.key}|${i}`]);
      } else {
        allChildrenFound = true;
      }
    }
    // characterSkillNodeLinks.forEach((nodeLink) => {
    //   if (nodeLink.child_key === node.key) {
    //     relatedLinksImChild.push(nodeLink);
    //   } else if (nodeLink.parent_key === node.key) {
    //     relatedLinksImParent.push(nodeLink);
    //   }
    // });

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
    // Grab all the parent subset required indices/nodes
    const subsetIndices = node.parent_subset_required.map((subsetKey) => stapledTable.findIndex((node) => node.key === subsetKey));
    const subsetNodes = subsetIndices.map((subIndex) => stapledTable[subIndex]);

    // Find the key with the highest tier
    let highest = subsetNodes[0];
    let highestSubsetIndex = subsetIndices[0];
    for (let i = 0; i < subsetNodes.length; i++) {
      if (subsetNodes[i].tier > highest.tier) {
        highest = subsetNodes[i];
        highestSubsetIndex = subsetIndices[i];
      }
    }

    stapledTable[highestSubsetIndex].right_arrow = true;
  });

  return stapledTable;
};

export default characterSkillNodes_characterSkillNodeLinks;
