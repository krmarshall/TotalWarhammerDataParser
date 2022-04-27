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
          tempAncillary.image_path = ancillaryTypeImageEnum[tempAncillary.type];

          if (tempAncillary.image_path === undefined) {
            console.log('Missing ancillary image for: ');
            console.log(tempAncillary.type);
          }

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

const ancillaryTypeImageEnum = {
  wh_main_anc_arcane_item: 'character_magic.png',
  wh_main_anc_enchanted_item: 'item_enchanted_item.png',
  wh_main_anc_weapon: 'item_weapon.png',
  wh_main_anc_armour: 'item_armour.png',
  wh_main_anc_talisman: 'item_talisman.png',
  wh_dlc05_anc_mount_wef_forest_dragon: 'mount_forest_dragon.png',
  wh2_dlc17_anc_banner_lzd_poison_daemonbane: '0_placeholder_skill.png',
  wh2_dlc17_anc_banner_lzd_poison_slow_death: '0_placeholder_skill.png',
  wh2_main_anc_magic_standard_sunburst_standard_of_hexoatl: '0_placeholder_skill.png',
};
