const addFactionAgents = [
  // WH2
  { faction: 'wh_main_emp_empire', agent: 'dlc03_emp_boris_todbringer', game: '2' },
  // WH3
  { faction: 'wh_main_emp_empire', agent: 'wh_dlc03_emp_boris_todbringer', game: '3' },

  { faction: 'wh_main_vmp_vampire_counts', agent: 'wh_pro02_vmp_isabella_von_carstein', game: '3' },

  { faction: 'wh_main_chs_chaos', agent: 'wh3_dlc20_chs_lord_mkho', game: '3' },
  { faction: 'wh_main_chs_chaos', agent: 'wh3_dlc20_chs_exalted_hero_mkho', game: '3' },
  { faction: 'wh_main_chs_chaos', agent: 'wh3_dlc20_chs_sorcerer_lord_death_mnur', game: '3' },
  { faction: 'wh_main_chs_chaos', agent: 'wh3_dlc20_chs_sorcerer_lord_nurgle_mnur', game: '3' },
  { faction: 'wh_main_chs_chaos', agent: 'wh3_dlc20_chs_exalted_hero_mnur', game: '3' },
  { faction: 'wh_main_chs_chaos', agent: 'wh3_dlc20_chs_lord_msla', game: '3' },
  { faction: 'wh_main_chs_chaos', agent: 'wh3_dlc20_chs_sorcerer_shadows_msla', game: '3' },
  { faction: 'wh_main_chs_chaos', agent: 'wh3_dlc20_chs_sorcerer_slaanesh_msla', game: '3' },
  { faction: 'wh_main_chs_chaos', agent: 'wh3_dlc20_chs_sorcerer_lord_metal_mtze', game: '3' },
  { faction: 'wh_main_chs_chaos', agent: 'wh3_dlc20_chs_sorcerer_lord_tzeentch_mtze', game: '3' },
  { faction: 'wh_main_chs_chaos', agent: 'wh3_dlc20_chs_sorcerer_metal_mtze', game: '3' },
  { faction: 'wh_main_chs_chaos', agent: 'wh3_dlc20_chs_sorcerer_tzeentch_mtze', game: '3' },
  { faction: 'wh_main_chs_chaos', agent: 'wh3_dlc20_chs_daemon_prince_undivided', game: '3' },
  { faction: 'wh_main_chs_chaos', agent: 'wh3_dlc20_chs_daemon_prince_khorne', game: '3' },
  { faction: 'wh_main_chs_chaos', agent: 'wh3_dlc20_chs_daemon_prince_nurgle', game: '3' },
  { faction: 'wh_main_chs_chaos', agent: 'wh3_dlc20_chs_daemon_prince_slaanesh', game: '3' },
  { faction: 'wh_main_chs_chaos', agent: 'wh3_dlc20_chs_daemon_prince_tzeentch', game: '3' },

  { faction: 'wh3_main_dae_daemons', agent: 'wh3_main_kho_exalted_bloodthirster', game: '3' },
  { faction: 'wh3_main_dae_daemons', agent: 'wh3_main_nur_exalted_great_unclean_one_death', game: '3' },
  { faction: 'wh3_main_dae_daemons', agent: 'wh3_main_nur_exalted_great_unclean_one_nurgle', game: '3' },
  { faction: 'wh3_main_dae_daemons', agent: 'wh3_main_sla_exalted_keeper_of_secrets_shadow', game: '3' },
  { faction: 'wh3_main_dae_daemons', agent: 'wh3_main_sla_exalted_keeper_of_secrets_slaanesh', game: '3' },
  { faction: 'wh3_main_dae_daemons', agent: 'wh3_main_tze_exalted_lord_of_change_metal', game: '3' },
  { faction: 'wh3_main_dae_daemons', agent: 'wh3_main_tze_exalted_lord_of_change_tzeentch', game: '3' },

  { faction: 'wh3_main_kho_khorne', agent: 'wh3_dlc20_chs_daemon_prince_khorne', game: '3' },

  { faction: 'wh3_main_nur_nurgle', agent: 'wh3_dlc20_chs_daemon_prince_nurgle', game: '3' },

  { faction: 'wh3_main_sla_slaanesh', agent: 'wh3_dlc20_chs_daemon_prince_slaanesh', game: '3' },

  { faction: 'wh3_main_tze_tzeentch', agent: 'wh3_dlc20_chs_daemon_prince_tzeentch', game: '3' },

  // Mixu3
  { faction: 'wh_main_brt_bretonnia', agent: 'brt_adalhard', game: '3', mod: 'mixu3' },
  { faction: 'wh_main_brt_bretonnia', agent: 'brt_amalric_de_gaudaron', game: '3', mod: 'mixu3' },
  { faction: 'wh_main_brt_bretonnia', agent: 'brt_bohemond', game: '3', mod: 'mixu3' },
  { faction: 'wh_main_brt_bretonnia', agent: 'brt_cassyon', game: '3', mod: 'mixu3' },
  { faction: 'wh_main_brt_bretonnia', agent: 'brt_chilfroy', game: '3', mod: 'mixu3' },
  { faction: 'wh_main_brt_bretonnia', agent: 'brt_donna_don_domingio', game: '3', mod: 'mixu3' },
  { faction: 'wh_main_brt_bretonnia', agent: 'brt_john_tyreweld', game: '3', mod: 'mixu3' },

  { faction: 'wh_dlc03_bst_beastmen', agent: 'bst_ghorros_warhoof', game: '3', mod: 'mixu3' },
  { faction: 'wh_dlc03_bst_beastmen', agent: 'bst_gorehoof', game: '3', mod: 'mixu3' },
  { faction: 'wh_dlc03_bst_beastmen', agent: 'bst_slugtongue', game: '3', mod: 'mixu3' },

  { faction: 'wh_main_chs_chaos', agent: 'chs_azubhor_clawhand', game: '3', mod: 'mixu3' },
  { faction: 'wh_main_chs_chaos', agent: 'chs_egrimm_van_horstmann', game: '3', mod: 'mixu3' },
  { faction: 'wh_main_chs_chaos', agent: 'chs_malofex_the_storm_chaser', game: '3', mod: 'mixu3' },

  { faction: 'wh2_dlc11_cst_vampire_coast', agent: 'cst_drekla', game: '3', mod: 'mixu3' },

  { faction: 'wh2_main_def_dark_elves', agent: 'def_kouran_darkhand', game: '3', mod: 'mixu3' },
  { faction: 'wh2_main_def_dark_elves', agent: 'def_tullaris_dreadbringer', game: '3', mod: 'mixu3' },
  // { faction: 'wh2_main_def_dark_elves', agent: 'def_tullaris_dreadbringer', game: '3', mod: 'mixu3' }, // Dupe

  { faction: 'wh_main_dwf_dwarfs', agent: 'dwf_grimm_burloksson', game: '3', mod: 'mixu3' },
  { faction: 'wh_main_dwf_dwarfs', agent: 'dwf_kazador_dragonslayer', game: '3', mod: 'mixu3' },
  { faction: 'wh_main_dwf_dwarfs', agent: 'dwf_kragg_the_grim', game: '3', mod: 'mixu3' },

  { faction: 'wh_main_emp_empire', agent: 'emp_alberich_haupt_anderssen', game: '3', mod: 'mixu3' },
  { faction: 'wh_main_emp_empire', agent: 'emp_alberich_von_korden', game: '3', mod: 'mixu3' },
  // { faction: 'wh_main_emp_empire', agent: 'emp_alberich_von_korden', game: '3', mod: 'mixu3' }, // Dupe
  { faction: 'wh_main_emp_empire', agent: 'emp_aldebrand_ludenhof', game: '3', mod: 'mixu3' },
  { faction: 'wh_main_emp_empire', agent: 'emp_edvard_van_der_kraal', game: '3', mod: 'mixu3' },
  { faction: 'wh_main_emp_empire', agent: 'emp_elspeth', game: '3', mod: 'mixu3' },
  { faction: 'wh_main_emp_empire', agent: 'emp_helmut_feuerbach', game: '3', mod: 'mixu3' },
  { faction: 'wh_main_emp_empire', agent: 'emp_luthor_huss', game: '3', mod: 'mixu3' },
  { faction: 'wh_main_emp_empire', agent: 'emp_marius_leitdorf', game: '3', mod: 'mixu3' },
  { faction: 'wh_main_emp_empire', agent: 'emp_theoderic_gausser', game: '3', mod: 'mixu3' },
  { faction: 'wh_main_emp_empire', agent: 'emp_theodore_bruckner', game: '3', mod: 'mixu3' },
  { faction: 'wh_main_emp_empire', agent: 'emp_valmir_von_raukov', game: '3', mod: 'mixu3' },
  { faction: 'wh_main_emp_empire', agent: 'emp_vorn_thugenheim', game: '3', mod: 'mixu3' },
  { faction: 'wh_main_emp_empire', agent: 'emp_warrior_priest_of_taal', game: '3', mod: 'mixu3' },
  { faction: 'wh_main_emp_empire', agent: 'emp_wolfram_hertwig', game: '3', mod: 'mixu3' },

  { faction: 'wh_main_grn_greenskins', agent: 'grn_gorfang_rotgut', game: '3', mod: 'mixu3' },

  { faction: 'wh2_main_hef_high_elves', agent: 'hef_belannaer', game: '3', mod: 'mixu3' },
  { faction: 'wh2_main_hef_high_elves', agent: 'hef_caradryan', game: '3', mod: 'mixu3' },
  // { faction: 'wh2_main_hef_high_elves', agent: 'hef_caradryan', game: '3', mod: 'mixu3' }, // Dupe
  { faction: 'wh2_main_hef_high_elves', agent: 'hef_korhil', game: '3', mod: 'mixu3' },

  { faction: 'wh2_main_lzd_lizardmen', agent: 'lzd_chakax', game: '3', mod: 'mixu3' },
  { faction: 'wh2_main_lzd_lizardmen', agent: 'lzd_lord_huinitenuchli', game: '3', mod: 'mixu3' },
  { faction: 'wh2_main_lzd_lizardmen', agent: 'lzd_tetto_eko', game: '3', mod: 'mixu3' },

  { faction: 'wh_dlc08_nor_norsca', agent: 'nor_egil_styrbjorn', game: '3', mod: 'mixu3' },
  { faction: 'wh_dlc08_nor_norsca', agent: 'nor_fraygerd_styrbjorn', game: '3', mod: 'mixu3' },
  { faction: 'wh_dlc08_nor_norsca', agent: 'nor_hrefna_styrbjorn', game: '3', mod: 'mixu3' },
  { faction: 'wh_dlc08_nor_norsca', agent: 'nor_sea_raider', game: '3', mod: 'mixu3' },

  { faction: 'wh2_main_skv_skaven', agent: 'skv_feskit', game: '3', mod: 'mixu3' },
  { faction: 'wh2_main_skv_skaven', agent: 'skv_grey_seer_death', game: '3', mod: 'mixu3' },

  { faction: 'wh2_dlc09_tmb_tomb_kings', agent: 'tmb_ramhotep', game: '3', mod: 'mixu3' },
  { faction: 'wh2_dlc09_tmb_tomb_kings', agent: 'tmb_tutankhanut', game: '3', mod: 'mixu3' },

  { faction: 'wh_main_vmp_vampire_counts', agent: 'vmp_dieter_helsnicht', game: '3', mod: 'mixu3' },

  { faction: 'wh_dlc05_wef_wood_elves', agent: 'wef_daith', game: '3', mod: 'mixu3' },
  { faction: 'wh_dlc05_wef_wood_elves', agent: 'wef_naieth_the_prophetess', game: '3', mod: 'mixu3' },
  { faction: 'wh_dlc05_wef_wood_elves', agent: 'wef_wychwethyl', game: '3', mod: 'mixu3' },

  { faction: 'wh_main_chs_chaos', agent: 'tze_melekh_the_changer', game: '3', mod: 'mixu3' }, // Apparently chaos according to https://steamcommunity.com/workshop/filedetails/discussion/2802810577/3317484899042968859/
];

export default addFactionAgents;
