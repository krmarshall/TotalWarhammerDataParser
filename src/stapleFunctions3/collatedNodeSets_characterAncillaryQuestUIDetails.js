import log from '../log.js';

const collatedNodeSets_characterAncillaryQuestUIDetails = (
  collatedNodeSets,
  characterSkillNodeSets,
  characterAncillaryQuestUIDetails,
  ancillaries,
  combinedLoc
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
          let relatedLocName = combinedLoc[`ancillaries_onscreen_name_${questAncillary.ancillary}`];
          if (relatedLocName === undefined) {
            log(`missing ancillary name: ${questAncillary.ancillary}`, 'grey');
            relatedLocName = 'MISSING LOC ENTRY';
          }
          let relatedLocDesc = combinedLoc[`ancillaries_colour_text_${questAncillary.ancillary}`];
          if (relatedLocDesc === undefined) {
            log(`missing ancillary text: ${questAncillary.ancillary}`, 'grey');
            relatedLocDesc = 'MISSING LOC ENTRY';
          }
          const tempAncillary = { ...relatedAncillary };
          tempAncillary.name = relatedLocName;
          tempAncillary.description = relatedLocDesc;
          tempAncillary.unlocked_at_rank = parseInt(questAncillary.rank);
          tempAncillary.instant = JSON.parse(questAncillary.instant);
          tempAncillary.image_path = ancillaryTypeImageEnum[tempAncillary.type];

          if (tempAncillary.image_path === undefined) {
            log(`Missing ancillary image for: ${tempAncillary.type}`, 'yellow');
          }

          if (node.items === undefined) {
            node.items = [];
          }
          node.items.push(tempAncillary);
        }
      });
    }
    returnObj[collatedNodeKey] = node;

    returnObj[collatedNodeKey].items.sort((a, b) => a.unlocked_at_rank - b.unlocked_at_rank);
  });
  return returnObj;
};

export default collatedNodeSets_characterAncillaryQuestUIDetails;

const ancillaryTypeImageEnum = {
  wh_main_anc_arcane_item: 'vanilla3/campaign_ui/skills/item_arcane_item',
  wh_main_anc_enchanted_item: 'vanilla3/campaign_ui/skills/item_enchanted_item',
  wh_main_anc_weapon: 'vanilla3/campaign_ui/skills/item_weapon',
  wh_main_anc_armour: 'vanilla3/campaign_ui/skills/item_armour',
  wh_main_anc_talisman: 'vanilla3/campaign_ui/skills/item_talisman',
  wh_dlc05_anc_mount_wef_forest_dragon: 'vanilla3/campaign_ui/skills/mount_forest_dragon',
  wh2_dlc17_anc_banner_lzd_poison_daemonbane: 'vanilla3/campaign_ui/skills/0_placeholder_skill',
  wh2_dlc17_anc_banner_lzd_poison_slow_death: 'vanilla3/campaign_ui/skills/0_placeholder_skill',
  wh2_main_anc_magic_standard_sunburst_standard_of_hexoatl: 'vanilla3/campaign_ui/skills/0_placeholder_skill',
  hkrul_emp_sec_marem: 'vanilla3/campaign_ui/skills/0_placeholder_skill',
};
