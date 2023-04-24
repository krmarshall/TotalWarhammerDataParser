import { Table } from '../generateTables';
import { GlobalDataInterface } from '../interfaces/GlobalDataInterface';
import processAgent from './processAgent';

const processFactions = (folder: string, globalData: GlobalDataInterface, tables: { [key: string]: Table }) => {
  const agentMap: { [key: string]: { subcultures: Set<string>; factions: Set<string> } } = {};
  tables.cultures_tables?.records.forEach((culture) => {
    if (!ignoreCultures.includes(culture.key)) {
      culture.foreignRefs?.cultures_subcultures.forEach((subculture) => {
        if (!ignoreSubcultures.includes(subculture.subculture)) {
          subculture.foreignRefs?.factions.forEach((faction) => {
            if (
              faction.is_quest_faction === 'false' &&
              faction.is_rebel === 'false' &&
              !faction.key.includes('_separatists') &&
              !faction.key.includes('_invasion') &&
              !faction.key.includes('_prologue') &&
              !ignoreFactions.includes(faction.key)
            ) {
              faction.foreignRefs?.faction_agent_permitted_subtypes.forEach((factionAgent) => {
                if (factionAgent.agent !== 'colonel' && factionAgent.agent !== 'minister') {
                  if (agentMap[factionAgent.subtype] === undefined) {
                    agentMap[factionAgent.subtype] = { subcultures: new Set(), factions: new Set() };
                  }
                  agentMap[factionAgent.subtype].subcultures.add(subculture.subculture);
                  agentMap[factionAgent.subtype].factions.add(faction.key);
                }
              });
            }
          });
        }
      });
    }
  });

  Object.keys(agentMap).forEach((agentKey) => {
    const agent = agentMap[agentKey];
    agent.subcultures.forEach((subculture) => {
      processAgent(folder, globalData, tables.agent_subtypes_tables.findRecordByKey('key', agentKey), subculture, agent.factions);
    });
  });
};

export default processFactions;

const ignoreCultures = ['*', 'wh2_main_rogue', 'wh3_main_pro_ksl_kislev'];
const ignoreSubcultures = [
  'wh3_main_pro_sc_kho_khorne',
  'wh3_main_pro_sc_tze_tzeentch',
  'wh_main_sc_grn_savage_orcs',
  'wh_main_sc_teb_teb',
];
const ignoreFactions = [
  'wh2_main_skv_unknown_clan_def',
  'wh2_main_skv_unknown_clan_hef',
  'wh2_main_skv_unknown_clan_lzd',
  'wh2_main_skv_unknown_clan_skv',
  'wh2_dlc13_bst_beastmen_invasion',
  'wh2_main_bst_blooded_axe',
  'wh2_main_bst_blooded_axe_brayherd',
  'wh2_main_bst_manblight',
  'wh2_main_bst_manblight_brayherd',
  'wh2_main_bst_ripper_horn',
  'wh2_main_bst_ripper_horn_brayherd',
  'wh2_main_bst_shadowgor',
  'wh2_main_bst_shadowgor_brayherd',
  'wh2_main_bst_skrinderkin',
  'wh2_main_bst_skrinderkin_brayherd',
  'wh2_main_bst_stone_horn',
  'wh2_main_bst_stone_horn_brayherd',
  'wh_dlc03_bst_beastmen_ally',
  'wh_dlc03_bst_beastmen_brayherd',
  'wh_dlc03_bst_beastmen_chaos',
  'wh_dlc03_bst_beastmen_chaos_brayherd',
  'wh_dlc03_bst_jagged_horn',
  'wh_dlc03_bst_jagged_horn_brayherd',
  'wh_dlc03_bst_redhorn',
  'wh_dlc03_bst_redhorn_brayherd',
  'wh2_dlc16_wef_waystone_faction_1',
  'wh2_dlc16_wef_waystone_faction_2',
  'wh2_dlc16_wef_waystone_faction_3',
  'wh2_main_nor_hung_incursion_def',
  'wh2_main_nor_hung_incursion_hef',
  'wh2_main_nor_hung_incursion_lzd',
  'wh2_main_nor_hung_incursion_skv',
  'wh2_main_chs_chaos_incursion_def',
  'wh2_main_chs_chaos_incursion_hef',
  'wh2_main_chs_chaos_incursion_lzd',
  'wh2_main_chs_chaos_incursion_skv',
  'wh_dlc08_chs_chaos_challenger_khorne',
  'wh_dlc08_chs_chaos_challenger_khorne_qb',
  'wh_dlc08_chs_chaos_challenger_nurgle',
  'wh_dlc08_chs_chaos_challenger_nurgle_qb',
  'wh_dlc08_chs_chaos_challenger_slaanesh',
  'wh_dlc08_chs_chaos_challenger_slaanesh_qb',
  'wh_dlc08_chs_chaos_challenger_tzeentch',
  'wh_dlc08_chs_chaos_challenger_tzeentch_qb',
  'att_fact_blue',
  'att_fact_red',
  'att_fact_yellow',
  'wh2_dlc16_grn_savage_invasion',
  'wh2_main_grn_blue_vipers',
  'wh2_main_grn_blue_vipers_waaagh',
  'wh3_main_grn_dimned_sun',
  'wh3_main_grn_dimned_sun_waaagh',
  'wh_main_grn_skull-takerz',
  'wh_main_grn_skull-takerz_waaagh',
  'wh_main_grn_top_knotz',
  'wh_main_grn_top_knotz_waaagh',
  'wh_main_vmp_rival_sylvanian_vamps',
];
