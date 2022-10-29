const collatedNodeSets_effectBundles = (collatedNodeSets, effectBundles) => {
  const returnObj = {};
  const collatedNodeKeys = Object.keys(collatedNodeSets);
  collatedNodeKeys.forEach((nodeKey) => {
    const nodeSet = collatedNodeSets[nodeKey];

    // Just guess based on key names, if mods dont follow vanillas pattern it wont pick them up
    const relatedBundle = effectBundles.find((bundle) => bundle.key.includes(`_lord_trait_${nodeSet.key}`));

    if (relatedBundle !== undefined) {
      nodeSet.factionEffects = { ...relatedBundle };
    }

    returnObj[nodeKey] = nodeSet;
  });

  return returnObj;
};

export default collatedNodeSets_effectBundles;
