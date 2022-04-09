const collatedNodeSets_characterAncillaryQuestUIDetails = (
  collatedNodeSets,
  characterSkillNodeSets,
  characterAncillaryQuestUIDetails,
  ancillaries,
  ancillaryLoc
) => {
  const returnObj = {};
  const collatedNodeKeys = Object.keys(collatedNodeSets);
  collatedNodeKeys.forEach((collatedNodeKey) => {
    const node = collatedNodeSets[collatedNodeKey];

    const relatedAgent = characterSkillNodeSets.find((nodeSet) => {
      return nodeSet.key === collatedNodeKey;
    });
    if (relatedAgent !== undefined) {
      const relatedAncillaryQuests = characterAncillaryQuestUIDetails.filter((ancQuest) => {
        return ancQuest.agent_subtype === relatedAgent.agent_subtype_key;
      });
      if (relatedAncillaryQuests.length === 0) {
        returnObj[collatedNodeKey] = node;
        return;
      }
      relatedAncillaryQuests.forEach((questAncillary) => {
        const relatedAncillary = ancillaries.find((ancillary) => {
          return ancillary.key === questAncillary.ancillary;
        });
        if (relatedAncillary !== undefined) {
          const relatedLocName = ancillaryLoc.find((loc) => {
            return loc.key === `ancillaries_onscreen_name_${questAncillary.ancillary}`;
          });
          const relatedLocDesc = ancillaryLoc.find((loc) => {
            return loc.key === `ancillaries_colour_text_${questAncillary.ancillary}`;
          });
          const tempAncillary = { ...relatedAncillary };
          tempAncillary.name = relatedLocName.text;
          tempAncillary.description = relatedLocDesc.text;
          tempAncillary.unlocked_at_rank = parseInt(questAncillary.rank);
          tempAncillary.instant = JSON.parse(questAncillary.instant);

          if (node.items === undefined) {
            node.items = [];
          }
          node.items.push(tempAncillary);
        }
      });
    }
    returnObj[collatedNodeKey] = node;
  });
  return returnObj;
};

export default collatedNodeSets_characterAncillaryQuestUIDetails;
