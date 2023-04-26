import { Table } from '../generateTables';
import CharacterListInterface from '../interfaces/CharacterListInterface';
import { GlobalDataInterface, RefKey, TableRecord } from '../interfaces/GlobalDataInterface';
import subcultureMap from '../lists/subcultureMap';
import vanillaCharacters from '../lists/vanillaCharacters';
import cleanNodeSetKey from '../utils/cleanNodeSetKey';
import processAgent from './processAgent';
import fse from 'fs-extra';

const processFactions = (folder: string, globalData: GlobalDataInterface, tables: { [key in RefKey]?: Table }, pruneVanilla: boolean) => {
  const agentMap: { [key: string]: { subcultures: Set<string>; factions: Set<string> } } = {};
  const characterList: CharacterListInterface = {};
  Object.values(subcultureMap).forEach((subculture) => (characterList[subculture] = { lords: {}, heroes: {} }));

  tables.cultures?.records.forEach((culture) => {
    if (ignoreCultures.includes(culture.key)) {
      return;
    }
    culture.foreignRefs?.cultures_subcultures?.forEach((subculture) => {
      if (
        ignoreSubcultures.some(
          (ignoreCult) => ignoreCult.subculture === subculture.subculture && (folder === ignoreCult.game || ignoreCult.game === 'ALL')
        )
      ) {
        return;
      }
      subculture.foreignRefs?.factions?.forEach((faction) => {
        if (
          faction.is_quest_faction === 'true' ||
          faction.is_rebel === 'true' ||
          faction.key.includes('_separatists') ||
          faction.key.includes('_invasion') ||
          faction.key.includes('_prologue') ||
          ignoreFactions.includes(faction.key)
        ) {
          return;
        }
        faction.foreignRefs?.faction_agent_permitted_subtypes?.forEach((factionAgent) => {
          if (factionAgent.agent === 'colonel' || factionAgent.agent === 'minister') {
            return;
          }
          if (
            ignoreAgents.some(
              (ignoreAgent) =>
                ignoreAgent.agent === factionAgent.subtype &&
                (ignoreAgent.game === 'ALL' || folder === ignoreAgent.game) &&
                (ignoreAgent.subculture === undefined || ignoreAgent.subculture === subculture.subculture)
            )
          ) {
            return;
          }
          const nodeSetKey = factionAgent?.localRefs?.agent_subtypes?.foreignRefs?.character_skill_node_sets?.[0]?.key;
          if (nodeSetKey === undefined) {
            return;
          }
          const cleanKey = cleanNodeSetKey(nodeSetKey as string);
          if (pruneVanilla && vanillaCharacters[cleanKey] !== undefined) {
            return;
          }

          if (agentMap[factionAgent.subtype] === undefined) {
            agentMap[factionAgent.subtype] = { subcultures: new Set(), factions: new Set() };
          }
          agentMap[factionAgent.subtype].subcultures.add(subculture.subculture);
          agentMap[factionAgent.subtype].factions.add(faction.key);

          const nameOverride = factionAgent?.localRefs?.agent_subtypes?.onscreen_name_override as string;
          if (factionAgent.agent === 'general') {
            characterList[subcultureMap[subculture.subculture]].lords[cleanKey] = { name: nameOverride, portrait: '' };
          } else {
            characterList[subcultureMap[subculture.subculture]].heroes[cleanKey] = { name: nameOverride, portrait: '' };
          }
        });
      });
    });
  });

  fse.outputJSONSync(`debug/${folder}/characterList.json`, characterList, { spaces: 2 });

  Object.keys(agentMap).forEach((agentKey) => {
    const agent = agentMap[agentKey];
    agent.subcultures.forEach((subculture) => {
      processAgent(folder, globalData, tables.agent_subtypes?.findRecordByKey('key', agentKey) as TableRecord, subculture, agent.factions);
    });
  });
};

export default processFactions;

const ignoreCultures = ['*', 'wh2_main_rogue', 'wh3_main_pro_ksl_kislev'];
const ignoreSubcultures = [
  { subculture: 'wh3_main_pro_sc_kho_khorne', game: 'ALL' },
  { subculture: 'wh3_main_pro_sc_tze_tzeentch', game: 'ALL' },
  { subculture: 'wh_main_sc_grn_savage_orcs', game: 'ALL' },
  { subculture: 'wh_main_sc_teb_teb', game: 'ALL' },

  { subculture: 'wh_main_sc_ksl_kislev', game: 'vanilla2' },
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

const ignoreAgents = [
  { agent: 'wh2_dlc13_lzd_kroxigor_ancient_horde', game: 'ALL' },
  { agent: 'wh2_dlc13_lzd_red_crested_skink_chief_horde', game: 'ALL' },
  { agent: 'wh2_dlc13_lzd_saurus_old_blood_horde', game: 'ALL' },
  { agent: 'wh2_dlc13_lzd_slann_mage_priest_horde', game: 'ALL' },
  { agent: 'wh2_main_lzd_slann_mage_priest_horde', game: 'ALL' },
  { agent: 'wh2_dlc13_lzd_slann_mage_priest_fire_horde', game: 'ALL' },
  { agent: 'wh2_dlc13_lzd_slann_mage_priest_high_horde', game: 'ALL' },
  { agent: 'wh2_dlc13_lzd_slann_mage_priest_life_horde', game: 'ALL' },
  { agent: 'wh2_dlc12_lzd_red_crested_skink_chief_legendary', game: 'ALL' },
  { agent: 'wh2_dlc12_lzd_tlaqua_skink_chief', game: 'ALL' },
  { agent: 'wh2_dlc12_lzd_tlaqua_skink_priest_beasts', game: 'ALL' },
  { agent: 'wh2_dlc12_lzd_tlaqua_skink_priest_heavens', game: 'ALL' },

  { agent: 'wh3_dlc20_chs_exalted_hero_mkho', game: '3', subculture: 'wh3_main_sc_dae_daemons' },
];
