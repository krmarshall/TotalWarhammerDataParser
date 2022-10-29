const collatedNodeSets_factionStartingGeneralEffects = (collatedNodeSets, characterSkillNodeSets, factionStartingGeneralEffects) => {
  const returnObj = {};
  const collatedNodeKeys = Object.keys(collatedNodeSets);
  collatedNodeKeys.forEach((collatedNodeKey) => {
    const nodeSet = collatedNodeSets[collatedNodeKey];

    const relatedAgent = characterSkillNodeSets.find((skillNodeSet) => skillNodeSet.key === collatedNodeKey);
    if (relatedAgent !== undefined) {
      const relatedStartEffects = factionStartingGeneralEffects.find((startEffect) => {
        return startEffect.agent_subtype === relatedAgent.agent_subtype_key;
      });

      if (relatedStartEffects !== undefined) {
        nodeSet.factionEffects = { ...relatedStartEffects.effect_bundle };
      }
    }

    returnObj[collatedNodeKey] = nodeSet;
  });

  return returnObj;
};

export default collatedNodeSets_factionStartingGeneralEffects;
