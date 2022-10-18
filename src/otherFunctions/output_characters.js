import fse from 'fs-extra';
import { outputCharactersPruneAll, outputCharactersPrune2, outputCharactersPrune3 } from '../pruneLists/outputCharactersPrune.js';

const pruneChar = (charKey, faction, folder) => {
  if (outputCharactersPruneAll.includes(charKey)) {
    return true;
  }

  const baseGamePrune = folder.includes('2') ? outputCharactersPrune2 : outputCharactersPrune3;
  let prune = false;
  for (let i = 0; i < baseGamePrune.length && !prune; i++) {
    if (baseGamePrune[i].charKey === charKey && baseGamePrune[i].faction === faction) {
      prune = true;
    }
  }
  return prune;
};

const output_characters = (cultures, collatedNodeSets, folder) => {
  const missingCharacters = [];
  cultures.forEach((culture) => {
    const spaces = process.env.NODE_ENV === 'production' ? 0 : 2;
    culture.lordNodeSets.forEach((lord) => {
      if (collatedNodeSets[lord] === undefined && !missingCharacters.includes(lord)) {
        missingCharacters.push(lord);
        return;
      }
      if (pruneChar(collatedNodeSets[lord].key, culture.key, folder)) {
        return;
      }
      // WH3 has beastlords randomly in subculture pools like oxyotl?
      if (culture.key !== 'wh_dlc03_bst_beastmen' && collatedNodeSets[lord].key === 'bst_beastlord') {
        return;
      }
      fse.outputJSONSync(`./output/${folder}/${cultureMap[culture.key]}/${collatedNodeSets[lord].key}.json`, collatedNodeSets[lord], {
        spaces,
      });
    });

    culture.heroNodeSets.forEach((hero) => {
      if (collatedNodeSets[hero] === undefined && !missingCharacters.includes(hero)) {
        missingCharacters.push(hero);
        return;
      }
      if (pruneChar(collatedNodeSets[hero].key, culture.key, folder)) {
        return;
      }
      fse.outputJSONSync(`./output/${folder}/${cultureMap[culture.key]}/${collatedNodeSets[hero].key}.json`, collatedNodeSets[hero], {
        spaces,
      });
    });
  });
  if (missingCharacters.length > 0) {
    console.log('\x1b[33m', `\b${folder} missing characters: ${missingCharacters}`, '\x1b[0m');
  }
};

export default output_characters;

const cultureMap = {
  wh_dlc03_bst_beastmen: 'bst_beastmen',
  wh_main_brt_bretonnia: 'brt_bretonnia',
  wh3_main_dae_daemons: 'dae_daemons',
  wh2_main_def_dark_elves: 'def_dark_elves',
  wh_main_dwf_dwarfs: 'dwf_dwarfs',
  wh_main_emp_empire: 'emp_empire',
  wh3_main_cth_cathay: 'cth_cathay',
  wh_main_grn_greenskins: 'grn_greenskins',
  wh2_main_hef_high_elves: 'hef_high_elves',
  wh3_main_kho_khorne: 'kho_khorne',
  wh3_main_ksl_kislev: 'ksl_kislev',
  wh2_main_lzd_lizardmen: 'lzd_lizardmen',
  wh_dlc08_nor_norsca: 'nor_norsca',
  wh3_main_nur_nurgle: 'nur_nurgle',
  wh3_main_ogr_ogre_kingdoms: 'ogr_ogre_kingdoms',
  wh2_main_skv_skaven: 'skv_skaven',
  wh3_main_sla_slaanesh: 'sla_slaanesh',
  wh2_dlc09_tmb_tomb_kings: 'tmb_tomb_kings',
  wh3_main_tze_tzeentch: 'tze_tzeentch',
  wh2_dlc11_cst_vampire_coast: 'cst_vampire_coast',
  wh_main_vmp_vampire_counts: 'vmp_vampire_counts',
  wh_main_chs_chaos: 'chs_chaos',
  wh_dlc05_wef_wood_elves: 'wef_wood_elves',

  mixer_gnob_gnoblar_horde: 'gnb_gnoblars',
};
