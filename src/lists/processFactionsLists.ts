const ignoreCultures = ['*', 'wh2_main_rogue', 'wh3_main_pro_ksl_kislev'];
const ignoreSubcultures = [
  { subculture: 'wh3_main_pro_sc_kho_khorne', game: 'ALL' },
  { subculture: 'wh3_main_pro_sc_tze_tzeentch', game: 'ALL' },
  { subculture: 'wh_main_sc_grn_savage_orcs', game: 'ALL' },
  { subculture: 'wh_main_sc_teb_teb', game: 'ALL' },

  { subculture: 'wh_main_sc_ksl_kislev', game: 'vanilla2' },

  { subculture: 'wh_main_teb_border_princes_CB', game: 'cat3' },
  { subculture: 'wh_main_teb_estalia_CB', game: 'cat3' },
  { subculture: 'wh_main_teb_tilea_CB', game: 'cat3' },
  { subculture: 'wh2_main_emp_new_world_colonies_CB', game: 'cat3' },
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
  { agent: 'wh2_dlc09_tmb_necrotect_ritual', game: 'ALL' },
  { agent: 'wh2_main_skv_warlock_engineer_ritual', game: 'ALL' },
  { agent: 'wh2_main_skv_plague_priest_ritual', game: 'ALL' },
  { agent: 'wh3_main_nur_cultist_plague_ritual', game: 'ALL' },
  { agent: 'wh2_dlc10_hef_shadow_walker', game: 'ALL' },
  { agent: 'wh2_pro08_neu_felix', game: 'ALL' },
  { agent: 'wh2_pro08_neu_gotrek', game: 'ALL' },

  { agent: 'wh3_dlc20_chs_exalted_hero_mkho', game: '3', subculture: 'wh3_main_sc_dae_daemons' },

  { agent: 'cth_pirate_lord', game: '3', subculture: 'wh2_dlc11_sc_cst_vampire_coast' },
  { agent: 'cth_pirate_queen', game: '3', subculture: 'wh2_dlc11_sc_cst_vampire_coast' },

  { agent: 'fim_finmor_kroll', game: '3', subculture: 'ovn_sc_fim_fimir' },
  { agent: 'aky_chief_fimir_great_weapons_kroll', game: '3', subculture: 'ovn_sc_fim_fimir' },

  // Lege3 WIPS
  { agent: 'str_ungrol', game: 'ALL' },
  { agent: 'str_dechala', game: 'ALL' },
  { agent: 'str_sayl', game: 'ALL' },
  { agent: 'str_gutrot', game: 'ALL' },
];

const remapFactions: { [key: string]: string } = {
  mixer_msl_mallobaude: 'mixu_vmp_mousillon_qb',
  mixer_msl_cult_of_the_bloody_grail: 'mixu_vmp_mousillon_qb',
};

const addAgents = [
  // WH2
  { agent: 'dlc03_emp_boris_todbringer', subculture: 'wh_main_sc_emp_empire', game: '2' },
  // WH3
  { agent: 'wh_dlc03_emp_boris_todbringer', subculture: 'wh_main_sc_emp_empire', game: '3' },
  { agent: 'wh_pro02_vmp_isabella_von_carstein', subculture: 'wh_main_sc_vmp_vampire_counts', game: '3' },
  { agent: 'wh3_dlc20_chs_lord_mkho', subculture: 'wh_main_sc_chs_chaos', game: '3' },
  { agent: 'wh3_dlc20_chs_exalted_hero_mkho', subculture: 'wh_main_sc_chs_chaos', game: '3' },
  { agent: 'wh3_dlc20_chs_sorcerer_lord_death_mnur', subculture: 'wh_main_sc_chs_chaos', game: '3' },
  { agent: 'wh3_dlc20_chs_sorcerer_lord_nurgle_mnur', subculture: 'wh_main_sc_chs_chaos', game: '3' },
  { agent: 'wh3_dlc20_chs_exalted_hero_mnur', subculture: 'wh_main_sc_chs_chaos', game: '3' },
  { agent: 'wh3_dlc20_chs_lord_msla', subculture: 'wh_main_sc_chs_chaos', game: '3' },
  { agent: 'wh3_dlc20_chs_sorcerer_shadows_msla', subculture: 'wh_main_sc_chs_chaos', game: '3' },
  { agent: 'wh3_dlc20_chs_sorcerer_slaanesh_msla', subculture: 'wh_main_sc_chs_chaos', game: '3' },
  { agent: 'wh3_dlc20_chs_sorcerer_lord_metal_mtze', subculture: 'wh_main_sc_chs_chaos', game: '3' },
  { agent: 'wh3_dlc20_chs_sorcerer_lord_tzeentch_mtze', subculture: 'wh_main_sc_chs_chaos', game: '3' },
  { agent: 'wh3_dlc20_chs_sorcerer_metal_mtze', subculture: 'wh_main_sc_chs_chaos', game: '3' },
  { agent: 'wh3_dlc20_chs_sorcerer_tzeentch_mtze', subculture: 'wh_main_sc_chs_chaos', game: '3' },
  { agent: 'wh3_dlc20_chs_daemon_prince_undivided', subculture: 'wh_main_sc_chs_chaos', game: '3' },
  { agent: 'wh3_dlc20_chs_daemon_prince_khorne', subculture: 'wh_main_sc_chs_chaos', game: '3' },
  { agent: 'wh3_dlc20_chs_daemon_prince_nurgle', subculture: 'wh_main_sc_chs_chaos', game: '3' },
  { agent: 'wh3_dlc20_chs_daemon_prince_slaanesh', subculture: 'wh_main_sc_chs_chaos', game: '3' },
  { agent: 'wh3_dlc20_chs_daemon_prince_tzeentch', subculture: 'wh_main_sc_chs_chaos', game: '3' },

  { agent: 'wh3_main_kho_exalted_bloodthirster', subculture: 'wh3_main_sc_dae_daemons', game: '3' },
  { agent: 'wh3_main_nur_exalted_great_unclean_one_death', subculture: 'wh3_main_sc_dae_daemons', game: '3' },
  { agent: 'wh3_main_nur_exalted_great_unclean_one_nurgle', subculture: 'wh3_main_sc_dae_daemons', game: '3' },
  { agent: 'wh3_main_sla_exalted_keeper_of_secrets_shadow', subculture: 'wh3_main_sc_dae_daemons', game: '3' },
  { agent: 'wh3_main_sla_exalted_keeper_of_secrets_slaanesh', subculture: 'wh3_main_sc_dae_daemons', game: '3' },
  { agent: 'wh3_main_tze_exalted_lord_of_change_metal', subculture: 'wh3_main_sc_dae_daemons', game: '3' },
  { agent: 'wh3_main_tze_exalted_lord_of_change_tzeentch', subculture: 'wh3_main_sc_dae_daemons', game: '3' },

  { agent: 'wh3_dlc20_chs_daemon_prince_khorne', subculture: 'wh3_main_sc_kho_khorne', game: '3' },

  { agent: 'wh3_dlc20_chs_daemon_prince_nurgle', subculture: 'wh3_main_sc_nur_nurgle', game: '3' },

  { agent: 'wh3_dlc20_chs_daemon_prince_slaanesh', subculture: 'wh3_main_sc_sla_slaanesh', game: '3' },

  { agent: 'wh3_dlc20_chs_daemon_prince_tzeentch', subculture: 'wh3_main_sc_tze_tzeentch', game: '3' },

  { agent: 'wh3_dlc23_chd_astragoth', subculture: 'wh3_dlc23_sc_chd_chaos_dwarfs', game: '3' },
  { agent: 'wh3_dlc23_chd_drazhoath', subculture: 'wh3_dlc23_sc_chd_chaos_dwarfs', game: '3' },
  { agent: 'wh3_dlc23_chd_zhatan', subculture: 'wh3_dlc23_sc_chd_chaos_dwarfs', game: '3' },

  // Mixu3 LL
  { agent: 'brt_adalhard', subculture: 'wh_main_sc_brt_bretonnia', game: '3' },
  { agent: 'brt_amalric_de_gaudaron', subculture: 'wh_main_sc_brt_bretonnia', game: '3' },
  { agent: 'brt_bohemond', subculture: 'wh_main_sc_brt_bretonnia', game: '3' },
  { agent: 'brt_cassyon', subculture: 'wh_main_sc_brt_bretonnia', game: '3' },
  { agent: 'brt_chilfroy', subculture: 'wh_main_sc_brt_bretonnia', game: '3' },
  { agent: 'brt_donna_don_domingio', subculture: 'wh_main_sc_brt_bretonnia', game: '3' },
  { agent: 'brt_john_tyreweld', subculture: 'wh_main_sc_brt_bretonnia', game: '3' },

  { agent: 'bst_ghorros_warhoof', subculture: 'wh_dlc03_sc_bst_beastmen', game: '3' },
  { agent: 'bst_gorehoof', subculture: 'wh_dlc03_sc_bst_beastmen', game: '3' },
  { agent: 'bst_slugtongue', subculture: 'wh_dlc03_sc_bst_beastmen', game: '3' },

  { agent: 'chs_azubhor_clawhand', subculture: 'wh_main_sc_chs_chaos', game: '3' },
  { agent: 'chs_malofex_the_storm_chaser', subculture: 'wh_main_sc_chs_chaos', game: '3' },

  { agent: 'cst_drekla', subculture: 'wh2_dlc11_sc_cst_vampire_coast', game: '3' },

  { agent: 'def_kouran_darkhand', subculture: 'wh2_main_sc_def_dark_elves', game: '3' },
  { agent: 'def_tullaris_dreadbringer', subculture: 'wh2_main_sc_def_dark_elves', game: '3' },

  { agent: 'dwf_grimm_burloksson', subculture: 'wh_main_sc_dwf_dwarfs', game: '3' },
  { agent: 'dwf_kazador_dragonslayer', subculture: 'wh_main_sc_dwf_dwarfs', game: '3' },
  { agent: 'dwf_kragg_the_grim', subculture: 'wh_main_sc_dwf_dwarfs', game: '3' },

  { agent: 'emp_alberich_haupt_anderssen', subculture: 'wh_main_sc_emp_empire', game: '3' },
  { agent: 'emp_alberich_von_korden', subculture: 'wh_main_sc_emp_empire', game: '3' },
  { agent: 'emp_alberich_von_korden_hero', subculture: 'wh_main_sc_emp_empire', game: '3' },
  { agent: 'emp_aldebrand_ludenhof', subculture: 'wh_main_sc_emp_empire', game: '3' },
  { agent: 'emp_edvard_van_der_kraal', subculture: 'wh_main_sc_emp_empire', game: '3' },
  { agent: 'emp_elspeth', subculture: 'wh_main_sc_emp_empire', game: '3' },
  { agent: 'emp_helmut_feuerbach', subculture: 'wh_main_sc_emp_empire', game: '3' },
  { agent: 'emp_luthor_huss', subculture: 'wh_main_sc_emp_empire', game: '3' },
  { agent: 'emp_marius_leitdorf', subculture: 'wh_main_sc_emp_empire', game: '3' },
  { agent: 'emp_theoderic_gausser', subculture: 'wh_main_sc_emp_empire', game: '3' },
  { agent: 'emp_theodore_bruckner', subculture: 'wh_main_sc_emp_empire', game: '3' },
  { agent: 'emp_valmir_von_raukov', subculture: 'wh_main_sc_emp_empire', game: '3' },
  { agent: 'emp_vorn_thugenheim', subculture: 'wh_main_sc_emp_empire', game: '3' },
  { agent: 'emp_warrior_priest_of_taal', subculture: 'wh_main_sc_emp_empire', game: '3' },
  { agent: 'emp_wolfram_hertwig', subculture: 'wh_main_sc_emp_empire', game: '3' },

  { agent: 'grn_gorfang_rotgut', subculture: 'wh_main_sc_grn_greenskins', game: '3' },

  { agent: 'hef_belannaer', subculture: 'wh2_main_sc_hef_high_elves', game: '3' },
  { agent: 'hef_caradryan', subculture: 'wh2_main_sc_hef_high_elves', game: '3' },
  { agent: 'hef_korhil', subculture: 'wh2_main_sc_hef_high_elves', game: '3' },

  { agent: 'lzd_chakax', subculture: 'wh2_main_sc_lzd_lizardmen', game: '3' },
  { agent: 'lzd_lord_huinitenuchli', subculture: 'wh2_main_sc_lzd_lizardmen', game: '3' },
  { agent: 'lzd_tetto_eko', subculture: 'wh2_main_sc_lzd_lizardmen', game: '3' },

  { agent: 'nor_egil_styrbjorn', subculture: 'wh_dlc08_sc_nor_norsca', game: '3' },
  { agent: 'nor_fraygerd_styrbjorn', subculture: 'wh_dlc08_sc_nor_norsca', game: '3' },
  { agent: 'nor_hrefna_styrbjorn', subculture: 'wh_dlc08_sc_nor_norsca', game: '3' },
  { agent: 'nor_sea_raider', subculture: 'wh_dlc08_sc_nor_norsca', game: '3' },

  { agent: 'skv_feskit', subculture: 'wh2_main_sc_skv_skaven', game: '3' },
  { agent: 'skv_grey_seer_death', subculture: 'wh2_main_sc_skv_skaven', game: '3' },

  { agent: 'tmb_ramhotep', subculture: 'wh2_dlc09_sc_tmb_tomb_kings', game: '3' },
  { agent: 'tmb_tutankhanut', subculture: 'wh2_dlc09_sc_tmb_tomb_kings', game: '3' },

  { agent: 'vmp_dieter_helsnicht', subculture: 'wh_main_sc_vmp_vampire_counts', game: '3' },

  { agent: 'wef_daith', subculture: 'wh_dlc05_sc_wef_wood_elves', game: '3' },
  { agent: 'wef_naieth_the_prophetess', subculture: 'wh_dlc05_sc_wef_wood_elves', game: '3' },
  { agent: 'wef_wychwethyl', subculture: 'wh_dlc05_sc_wef_wood_elves', game: '3' },

  { agent: 'tze_melekh_the_changer', subculture: 'wh_main_sc_chs_chaos', game: '3' },

  { agent: 'chs_egrimm_van_horstmann', subculture: 'wh3_main_sc_tze_tzeentch', game: '3' },
  { agent: 'mixu_tze_exalted_hero', subculture: 'wh3_main_sc_tze_tzeentch', game: '3' },

  // Lege 3
  { agent: 'str_rykarth', subculture: 'wh3_dlc23_sc_chd_chaos_dwarfs', game: '3' },

  // Mixu 3 Mousillon
  { agent: 'msl_mallobaude', subculture: 'mixu_vmp_mousillon_qb', game: '3' },
  { agent: 'msl_bougars_the_butcher', subculture: 'mixu_vmp_mousillon_qb', game: '3' },
  { agent: 'msl_eustache_of_the_rusting_blade', subculture: 'mixu_vmp_mousillon_qb', game: '3' },
  { agent: 'msl_aucassin_de_hane', subculture: 'mixu_vmp_mousillon_qb', game: '3' },
  { agent: 'msl_the_old_one', subculture: 'mixu_vmp_mousillon_qb', game: '3' },
  { agent: 'msl_nicolete_de_oisement', subculture: 'mixu_vmp_mousillon_qb', game: '3' },
  { agent: 'msl_lady_of_the_black_grail', subculture: 'mixu_vmp_mousillon_qb', game: '3' },

  // Mixu 3 Gnobs
  { agent: 'gnob_bragg_the_gutsman', subculture: 'mixer_gnob_gnoblar_horde', game: '3' },
  { agent: 'gnob_gnobbo', subculture: 'mixer_gnob_gnoblar_horde', game: '3' },
  { agent: 'gnob_king_bezos', subculture: 'mixer_gnob_gnoblar_horde', game: '3' },

  // Mixu 3 Slayer
  { agent: 'dwf_daemon_slayer', subculture: 'wh_main_sc_dwf_dwarfs', game: '3' },

  // Empire Secessionists
  { agent: 'hkrul_emp_sec_hans', subculture: 'wh_main_sc_emp_empire', game: '3' },

  // Cataph TEB
  { agent: 'teb_borgio_the_besieger', subculture: 'mixer_teb_southern_realms', game: '3' },
  { agent: 'teb_gashnag', subculture: 'mixer_teb_southern_realms', game: '3' },
  { agent: 'teb_lucrezzia_belladonna', subculture: 'mixer_teb_southern_realms', game: '3' },
  { agent: 'teb_catrazza', subculture: 'mixer_teb_southern_realms', game: '3' },
  { agent: 'teb_lupio', subculture: 'mixer_teb_southern_realms', game: '3' },
  { agent: 'teb_gausser', subculture: 'mixer_teb_southern_realms', game: '3' },
  { agent: 'teb_colombo', subculture: 'mixer_teb_southern_realms', game: '3' },
  { agent: 'teb_cadavo', subculture: 'mixer_teb_southern_realms', game: '3' },

  // Cataph Kraka Drak
  { agent: 'kraka_cromson', subculture: 'wh_main_sc_dwf_dwarfs', game: '3' },

  // OvN Grudgebringers
  { agent: 'ludwig_uberdorf_agent_subtype', subculture: 'wh_main_sc_emp_empire', game: '3' },
];

export { ignoreCultures, ignoreSubcultures, ignoreFactions, ignoreAgents, addAgents, remapFactions };
