const charList_factionStartingGeneralEffects = (charList, characterSkillNodeSets, factionStartingGeneralEffects) => {
  const factionKeys = Object.keys(charList);
  factionKeys.forEach((factionKey) => {
    const factionCharKeys = Object.keys(charList[factionKey]);
    factionCharKeys.forEach((charKey) => {
      const charNodeSet = charList[factionKey][charKey];

      const relatedAgent = characterSkillNodeSets.find((skillNodeSet) => skillNodeSet.key === charNodeSet.fullKey);
      if (relatedAgent !== undefined) {
        const relatedStartEffects = factionStartingGeneralEffects.find(
          (startEffect) => startEffect.agent_subtype === relatedAgent.agent_subtype_key
        );

        if (relatedStartEffects !== undefined) {
          charNodeSet.factionEffects = { ...relatedStartEffects.effect_bundle };
        }
      }
    });
  });
  return charList;
};

export default charList_factionStartingGeneralEffects;
