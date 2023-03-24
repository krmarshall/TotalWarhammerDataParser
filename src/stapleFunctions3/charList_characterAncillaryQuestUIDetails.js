import log from '../log.js';

const charList_characterAncillaryQuestUIDetails = (
  charList,
  characterSkillNodeSets,
  characterAncillaryQuestUIDetails,
  ancillaries,
  combinedLoc
) => {
  const factionKeys = Object.keys(charList);
  factionKeys.forEach((factionKey) => {
    const factionCharKeys = Object.keys(charList[factionKey]);
    factionCharKeys.forEach((charKey) => {
      const charNodeSet = charList[factionKey][charKey];

      const relatedAgent = characterSkillNodeSets.find((nodeSet) => charNodeSet.fullKey === nodeSet.key);

      if (relatedAgent !== undefined) {
        const relatedAncillaryQuests = characterAncillaryQuestUIDetails.filter(
          (ancQuest) => ancQuest.agent_subtype === relatedAgent.agent_subtype_key
        );

        relatedAncillaryQuests.forEach((questAncillary) => {
          const relatedAncillary = ancillaries.find((ancillary) => ancillary.key === questAncillary.ancillary);
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

            if (charNodeSet.items === undefined) {
              charNodeSet.items = [];
            }
            charNodeSet.items.push(tempAncillary);
          }
        });

        if (charNodeSet.items !== undefined) {
          charNodeSet.items.sort((a, b) => a.unlocked_at_rank - b.unlocked_at_rank);
        }
      }
    });
  });

  return charList;
};

export default charList_characterAncillaryQuestUIDetails;

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
  kou_mount_zlatgar_mount_1: 'lege3/campaign_ui/skills/kou_razordon_mount_image',
  kou_skill_stag_chariot_mount: 'lege3/campaign_ui/skills/mount_stag_chariot',
  kou_anc_treeman_mount: 'lege3/campaign_ui/skills/mount_treeman_companion',
  hkrul_erkstein_banner: 'lege3/campaign_ui/ancillaries/hkrul_mar_erkstein_banner',
  hkrul_mar_coin: 'vanilla3/campaign_ui/skills/item_enchanted_item',
  hkrul_mar_anc_sander: 'scm3/campaign_ui/ancillaries/hkrul_mar_sander',
  hkrul_mar_egmond_nippon: 'scm3/campaign_ui/ancillaries/hkrul_mar_egmond_nippon',
  hkrul_mar_gruber: 'scm3/campaign_ui/ancillaries/hkrul_mar_gruber',
  hkrul_mar_black_cap: 'scm3/campaign_ui/ancillaries/hkrul_mar_black_cap_72',
  hkrul_mar_lea: 'scm3/campaign_ui/ancillaries/hkrul_mar_lea',
  hkrul_mar_casino: 'scm3/campaign_ui/ancillaries/hkrul_mar_casino',
  hkrul_mar_casanova: 'scm3/campaign_ui/ancillaries/hkrul_mar_casanova',
  hkrul_mar_hilaria: 'scm3/campaign_ui/ancillaries/hkrul_mar_mundvard_follower',
};
