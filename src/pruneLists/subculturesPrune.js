const subculturesPrune = [
  // Tomb Kings
  'wh2_dlc09_tmb_tomb_kings_rebels',
  'wh2_dlc09_tmb_tombking_qb1',
  'wh2_dlc09_tmb_tombking_qb2',
  'wh2_dlc09_tmb_tombking_qb3',
  'wh2_dlc09_tmb_tombking_qb4',
  'wh2_dlc09_tmb_tombking_qb_exiles_of_nehek',
  'wh2_dlc09_tmb_tombking_qb_followers_of_nagash',
  'wh2_dlc09_tmb_tombking_qb_khemri',
  'wh2_dlc09_tmb_tombking_qb_lybaras',

  // Vampire Coast
  'wh2_dlc11_cst_pirates_of_sartosa_separatists',
  'wh2_dlc11_cst_the_drowned_separatists',
  'wh2_dlc11_cst_noctilus_separatists',
  'wh2_dlc11_cst_vampire_coast_qb1',
  'wh2_dlc11_cst_vampire_coast_qb2',
  'wh2_dlc11_cst_vampire_coast_qb3',
  'wh2_dlc11_cst_vampire_coast_qb4',
  'wh2_dlc11_cst_vampire_coast_rebellion_rebels',
  'wh2_dlc11_cst_vampire_coast_rebels',
  'wh2_dlc11_cst_vampire_coast_separatists',

  // Dark Elves
  'wh2_dlc11_def_the_blessed_dread_separatists',
  'wh2_main_def_cult_of_pleasure_separatists',
  'wh2_main_def_dark_elves_intervention',
  'wh2_main_def_dark_elves_qb1',
  'wh2_main_def_dark_elves_qb2',
  'wh2_main_def_dark_elves_qb3',
  'wh2_main_def_dark_elves_qb4',
  'wh2_main_def_dark_elves_rebels',
  'wh2_main_def_hag_graef_separatists',
  'wh2_main_def_har_ganeth_separatists',
  'wh2_main_def_naggarond_separatists',
  'wh2_twa03_def_rakarth_separatists',

  // High Elves
  'wh2_dlc15_hef_dragon_encounters',
  'wh2_main_hef_high_elves_intervention',
  'wh2_main_hef_high_elves_qb1',
  'wh2_main_hef_high_elves_qb2',
  'wh2_main_hef_high_elves_qb3',
  'wh2_main_hef_high_elves_qb4',
  'wh2_main_hef_high_elves_rebels',

  // Lizardmen
  'wh2_main_lzd_lizardmen_intervention',
  'wh2_main_lzd_lizardmen_qb1',
  'wh2_main_lzd_lizardmen_qb2',
  'wh2_main_lzd_lizardmen_qb3',
  'wh2_main_lzd_lizardmen_qb4',
  'wh2_main_lzd_lizardmen_rebels',

  // Skaven
  'wh2_dlc09_skv_clan_rictus_separatists',
  'wh2_dlc13_skv_skaven_invasion',
  'wh2_dlc14_skv_rictus_clan_nest',
  'wh2_main_skv_clan_eshin_separatists',
  'wh2_main_skv_clan_mors_separatists',
  'wh2_main_skv_clan_moulder_separatists',
  'wh2_main_skv_clan_pestilens_separatists',
  'wh2_main_skv_clan_skryre_separatists',
  'wh2_main_skv_skaven_intervention',
  'wh2_main_skv_skaven_qb1',
  'wh2_main_skv_skaven_qb2',
  'wh2_main_skv_skaven_qb3',
  'wh2_main_skv_skaven_qb4',
  'wh2_main_skv_skaven_rebels',
  'wh2_main_skv_unknown_clan_def',
  'wh2_main_skv_unknown_clan_hef',
  'wh2_main_skv_unknown_clan_lzd',
  'wh2_main_skv_unknown_clan_skv',

  // Beastmen
  'wh2_dlc13_bst_beastmen_invasion',
  'wh2_dlc17_bst_beastmen_qb4',
  'wh2_dlc17_bst_beastmen_qb5',
  'wh2_dlc17_bst_beastmen_qb6',
  'wh2_dlc17_bst_beastmen_qb7',
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
  'wh_dlc03_bst_beastmen_qb1',
  'wh_dlc03_bst_beastmen_qb2',
  'wh_dlc03_bst_beastmen_qb3',
  'wh_dlc03_bst_beastmen_rebels',
  'wh_dlc03_bst_beastmen_rebels_brayherd',
  'wh_dlc03_bst_jagged_horn',
  'wh_dlc03_bst_jagged_horn_brayherd',
  'wh_dlc03_bst_redhorn',
  'wh_dlc03_bst_redhorn_brayherd',

  // Wood Elves
  'wh2_dlc16_wef_waystone_faction_1',
  'wh2_dlc16_wef_waystone_faction_2',
  'wh2_dlc16_wef_waystone_faction_3',
  'wh2_dlc16_wef_wood_elves_qb4',
  'wh2_dlc16_wef_wood_elves_qb5',
  'wh2_dlc16_wef_wood_elves_qb6',
  'wh2_dlc16_wef_wood_elves_qb7',
  'wh_dlc05_wef_wood_elves_qb1',
  'wh_dlc05_wef_wood_elves_qb2',
  'wh_dlc05_wef_wood_elves_qb3',
  'wh_dlc05_wef_wood_elves_rebels',

  // Norsca
  'wh2_dlc13_nor_norsca_invasion',
  'wh2_main_nor_hung_incursion_def',
  'wh2_main_nor_hung_incursion_hef',
  'wh2_main_nor_hung_incursion_lzd',
  'wh2_main_nor_hung_incursion_skv',
  'wh_main_nor_norsca_qb1',
  'wh_main_nor_norsca_qb2',
  'wh_main_nor_norsca_qb3',
  'wh_main_nor_norsca_rebels',
  'wh_main_nor_norsca_separatists',
  'wh_main_nor_norsca_separatists_sorcerer_lord',

  // Brettonia
  'wh_main_brt_bretonnia_qb1',
  'wh_main_brt_bretonnia_qb2',
  'wh_main_brt_bretonnia_qb3',
  'wh_main_brt_bretonnia_rebels',

  // Chaos
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
  'wh_main_chs_chaos_qb1',
  'wh_main_chs_chaos_qb2',
  'wh_main_chs_chaos_qb3',
  'wh_main_chs_chaos_rebels',
  'wh_main_chs_chaos_separatists',

  // Dwarfs
  'wh_main_dwf_dwarf_rebels',
  'wh_main_dwf_dwarfs_qb1',
  'wh_main_dwf_dwarfs_qb2',
  'wh_main_dwf_dwarfs_qb3',
  'wh_main_dwf_dwarfs_qb4',
  'wh_main_dwf_dwarfs_seperatists_qb1',
  'wh_main_dwf_dwarfs_seperatists_qb2',
  'wh_main_dwf_dwarfs_seperatists_qb3',
  'wh_main_dwf_dwarfs_seperatists_qb4',

  // Empire
  'att_fact_blue',
  'att_fact_red',
  'att_fact_yellow',
  'wh2_dlc11_emp_empire_qb5',
  'wh2_dlc16_emp_colonist_invasion',
  'wh2_dlc16_emp_empire_invasion',
  'wh2_dlc16_emp_empire_qb8',
  'wh_main_emp_empire_qb1',
  'wh_main_emp_empire_qb2',
  'wh_main_emp_empire_qb3',
  'wh_main_emp_empire_qb4',
  'wh_main_emp_empire_qb_intro',
  'wh_main_emp_empire_rebels',
  'wh_main_emp_empire_rebels_qb1',
  'wh_main_emp_empire_separatists',
  'wh_main_emp_marienburg_rebels',

  // Greenskins
  'wh2_dlc12_grn_leaf_cutterz_tribe_waaagh',
  'wh2_dlc13_grn_greenskins_invasion',
  'wh2_dlc14_grn_red_cloud_waaagh',
  'wh2_dlc15_grn_broken_axe_waaagh',
  'wh2_dlc16_grn_naggaroth_orcs',
  'wh2_main_grn_arachnos_waaagh',
  'wh_main_grn_black_venom_waaagh',
  'wh_main_grn_bloody_spearz_waaagh',
  'wh_main_grn_broken_nose_waaagh',
  'wh_main_grn_crooked_moon_waaagh',
  'wh_main_grn_greenskins_qb1',
  'wh_main_grn_greenskins_qb2',
  'wh_main_grn_greenskins_qb3',
  'wh_main_grn_greenskins_qb4',
  'wh_main_grn_greenskins_rebels',
  'wh_main_grn_greenskins_rebels_waaagh',
  'wh_main_grn_greenskins_waaagh',
  'wh_main_grn_necksnappers_waaagh',
  'wh_main_grn_orcs_of_the_bloody_hand_waaagh',
  'wh_main_grn_red_eye_waaagh',
  'wh_main_grn_red_fangs_waaagh',
  'wh_main_grn_scabby_eye_waaagh',
  'wh_main_grn_skullsmasherz_waaagh',
  'wh_main_grn_teef_snatchaz_waaagh',

  // Vampire Counts
  'wh_main_vmp_rival_sylvanian_vamps',
  'wh_main_vmp_vampire_counts_qb1',
  'wh_main_vmp_vampire_counts_qb2',
  'wh_main_vmp_vampire_counts_qb3',
  'wh_main_vmp_vampire_rebels',

  // WH3 Probably needs more tweaks
  // Cathay
  'wh3_main_cth_cathay_qb1',
  'wh3_main_cth_cathay_rebels',

  // Daemons
  'wh3_main_dae_daemons_qb1',

  // Khorne
  'wh3_main_kho_khorne_qb1',
  'wh3_main_kho_khorne_qb2',
  'wh3_main_kho_khorne_rebels',

  // Kislev
  'wh3_main_ksl_kislev_qb1',
  'wh3_main_ksl_kislev_rebels',

  // Nurgle
  'wh3_main_nur_nurgle_qb1',
  'wh3_main_nur_nurgle_rebels',

  // Ogres
  'wh3_main_ogr_ogre_kingdoms_qb1',
  'wh3_main_ogr_ogre_rebels',

  // Slaanesh
  'wh3_main_sla_slaanesh_qb1',
  'wh3_main_sla_slaanesh_rebels',

  // Tzeentch
  'wh3_main_tze_tzeentch_qb1',
  'wh3_main_tze_tzeentch_qb2',
  'wh3_main_tze_tzeentch_rebels',

  // Prologue
  // Lots of prologue factions (including in norsca), need to investigate more
  'wh3_prologue_dervingard_garrison',
  'wh3_prologue_kislev_expedition',
  'wh3_prologue_gharhars',
  'wh3_prologue_great_eagle_tribe',
  'wh3_prologue_horde_of_kurnz',
  'wh3_prologue_ksl_petrenkos_raiders',
  'wh3_prologue_the_kvelligs',
  'wh3_prologue_the_narj',
  'wh3_prologue_the_tahmaks',
  'wh3_prologue_tong',
];

export default subculturesPrune;
