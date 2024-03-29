const vanillaCharacters: { [key: string]: string } = {
  brt_alberic: 'brt_alberic',
  brt_damsel: 'brt_damsel',
  brt_damsel_beasts: 'brt_damsel_beasts',
  brt_damsel_life: 'brt_damsel_life',
  brt_fay_enchantress: 'brt_fay_enchantress',
  brt_green_knight: 'brt_green_knight',
  brt_henri_le_massif: 'brt_henri_le_massif',
  brt_lord: 'brt_lord',
  brt_louen: 'brt_louen',
  brt_paladin: 'brt_paladin',
  brt_prophetess_beast: 'brt_prophetess_beast',
  brt_prophetess_heavens: 'brt_prophetess_heavens',
  brt_prophetess_life: 'brt_prophetess_life',
  brt_repanse: 'brt_repanse',
  bst_beastlord: 'bst_beastlord',
  bst_bray_shaman_beast: 'bst_bray_shaman_beast',
  bst_bray_shaman_death: 'bst_bray_shaman_death',
  bst_bray_shaman_shadows: 'bst_bray_shaman_shadows',
  bst_bray_shaman_wild: 'bst_bray_shaman_wild',
  bst_doombull: 'bst_doombull',
  bst_gorebull: 'bst_gorebull',
  bst_great_bray_shaman_beast: 'bst_great_bray_shaman_beast',
  bst_great_bray_shaman_death: 'bst_great_bray_shaman_death',
  bst_great_bray_shaman_shadows: 'bst_great_bray_shaman_shadows',
  bst_great_bray_shaman_wild: 'bst_great_bray_shaman_wild',
  bst_khazrak: 'bst_khazrak',
  bst_malagor: 'bst_malagor',
  bst_morghur: 'bst_morghur',
  bst_taurox: 'bst_taurox',
  bst_wargor: 'bst_wargor',
  chs_archaon: 'chs_archaon',
  chs_chaos_sorcerer_death: 'chs_chaos_sorcerer_death',
  chs_chaos_sorcerer_fire: 'chs_chaos_sorcerer_fire',
  chs_chaos_sorcerer_metal: 'chs_chaos_sorcerer_metal',
  chs_daemon_prince_khorne: 'chs_daemon_prince_khorne',
  chs_daemon_prince_nurgle: 'chs_daemon_prince_nurgle',
  chs_daemon_prince_slaanesh: 'chs_daemon_prince_slaanesh',
  chs_daemon_prince_tzeentch: 'chs_daemon_prince_tzeentch',
  chs_daemon_prince_undivided: 'chs_daemon_prince_undivided',
  chs_exalted_hero: 'chs_exalted_hero',
  chs_exalted_hero_mkho: 'chs_exalted_hero_mkho',
  chs_exalted_hero_mnur: 'chs_exalted_hero_mnur',
  chs_kholek: 'chs_kholek',
  chs_lord: 'chs_lord',
  chs_lord_mkho: 'chs_lord_mkho',
  chs_lord_msla: 'chs_lord_msla',
  chs_lord_of_change: 'chs_lord_of_change',
  chs_sigvald: 'chs_sigvald',
  chs_sorcerer_lord_death: 'chs_sorcerer_lord_death',
  chs_sorcerer_lord_death_mnur: 'chs_sorcerer_lord_death_mnur',
  chs_sorcerer_lord_fire: 'chs_sorcerer_lord_fire',
  chs_sorcerer_lord_metal: 'chs_sorcerer_lord_metal',
  chs_sorcerer_lord_metal_mtze: 'chs_sorcerer_lord_metal_mtze',
  chs_sorcerer_lord_nurgle_mnur: 'chs_sorcerer_lord_nurgle_mnur',
  chs_sorcerer_lord_shadow: 'chs_sorcerer_lord_shadow',
  chs_sorcerer_lord_tzeentch_mtze: 'chs_sorcerer_lord_tzeentch_mtze',
  chs_sorcerer_metal_mtze: 'chs_sorcerer_metal_mtze',
  chs_sorcerer_shadow: 'chs_sorcerer_shadow',
  chs_sorcerer_shadows_msla: 'chs_sorcerer_shadows_msla',
  chs_sorcerer_slaanesh_msla: 'chs_sorcerer_slaanesh_msla',
  chs_sorcerer_tzeentch_mtze: 'chs_sorcerer_tzeentch_mtze',
  dae_cha_be_lakor_0: 'dae_cha_be_lakor_0',
  kho_valkia: 'kho_valkia',
  nur_festus: 'nur_festus',
  sla_azazel: 'sla_azazel',
  tze_vilitch: 'tze_vilitch',
  cst_admiral: 'cst_admiral',
  cst_admiral_death: 'cst_admiral_death',
  cst_admiral_deep: 'cst_admiral_deep',
  cst_admiral_fem: 'cst_admiral_fem',
  cst_admiral_fem_death: 'cst_admiral_fem_death',
  cst_admiral_fem_deep: 'cst_admiral_fem_deep',
  cst_admiral_tech_01: 'cst_admiral_tech_01',
  cst_admiral_tech_02: 'cst_admiral_tech_02',
  cst_admiral_tech_03: 'cst_admiral_tech_03',
  cst_admiral_tech_04: 'cst_admiral_tech_04',
  cst_aranessa: 'cst_aranessa',
  cst_cylostra: 'cst_cylostra',
  cst_fleet_captain: 'cst_fleet_captain',
  cst_fleet_captain_death: 'cst_fleet_captain_death',
  cst_fleet_captain_deep: 'cst_fleet_captain_deep',
  cst_ghost_paladin: 'cst_ghost_paladin',
  cst_gunnery_wight: 'cst_gunnery_wight',
  cst_harkon: 'cst_harkon',
  cst_mourngul: 'cst_mourngul',
  cst_noctilus: 'cst_noctilus',
  cth_alchemist: 'cth_alchemist',
  cth_astromancer: 'cth_astromancer',
  cth_dragon_blooded_shugengan_yang: 'cth_dragon_blooded_shugengan_yang',
  cth_dragon_blooded_shugengan_yin: 'cth_dragon_blooded_shugengan_yin',
  cth_lord_caravan_master: 'cth_lord_caravan_master',
  cth_lord_magistrate_yang: 'cth_lord_magistrate_yang',
  cth_lord_magistrate_yin: 'cth_lord_magistrate_yin',
  cth_miao_ying: 'cth_miao_ying',
  cth_zhao_ming: 'cth_zhao_ming',
  dae_daemon_prince: 'dae_daemon_prince',
  kho_bloodreaper: 'kho_bloodreaper',
  kho_exalted_bloodthirster: 'kho_exalted_bloodthirster',
  kho_herald_of_khorne: 'kho_herald_of_khorne',
  nur_exalted_great_unclean_one_death: 'nur_exalted_great_unclean_one_death',
  nur_exalted_great_unclean_one_nurgle: 'nur_exalted_great_unclean_one_nurgle',
  nur_herald_of_nurgle_death: 'nur_herald_of_nurgle_death',
  nur_herald_of_nurgle_nurgle: 'nur_herald_of_nurgle_nurgle',
  nur_plagueridden_death: 'nur_plagueridden_death',
  nur_plagueridden_nurgle: 'nur_plagueridden_nurgle',
  sla_alluress_shadow: 'sla_alluress_shadow',
  sla_alluress_slaanesh: 'sla_alluress_slaanesh',
  sla_exalted_keeper_of_secrets_shadow: 'sla_exalted_keeper_of_secrets_shadow',
  sla_exalted_keeper_of_secrets_slaanesh: 'sla_exalted_keeper_of_secrets_slaanesh',
  sla_herald_of_slaanesh_shadow: 'sla_herald_of_slaanesh_shadow',
  sla_herald_of_slaanesh_slaanesh: 'sla_herald_of_slaanesh_slaanesh',
  tze_exalted_lord_of_change_metal: 'tze_exalted_lord_of_change_metal',
  tze_exalted_lord_of_change_tzeentch: 'tze_exalted_lord_of_change_tzeentch',
  tze_herald_of_tzeentch_metal: 'tze_herald_of_tzeentch_metal',
  tze_herald_of_tzeentch_tzeentch: 'tze_herald_of_tzeentch_tzeentch',
  tze_iridescent_horror_metal: 'tze_iridescent_horror_metal',
  tze_iridescent_horror_tzeentch: 'tze_iridescent_horror_tzeentch',
  def_black_ark: 'def_black_ark',
  def_black_ark_blessed_dread: 'def_black_ark_blessed_dread',
  def_crone: 'def_crone',
  def_death_hag: 'def_death_hag',
  def_dreadlord: 'def_dreadlord',
  def_dreadlord_fem: 'def_dreadlord_fem',
  def_high_beastmaster: 'def_high_beastmaster',
  def_khainite_assassin: 'def_khainite_assassin',
  def_lokhir: 'def_lokhir',
  def_malekith: 'def_malekith',
  def_malus: 'def_malus',
  def_master: 'def_master',
  def_morathi: 'def_morathi',
  def_rakarth: 'def_rakarth',
  def_sorceress_beasts: 'def_sorceress_beasts',
  def_sorceress_dark: 'def_sorceress_dark',
  def_sorceress_death: 'def_sorceress_death',
  def_sorceress_fire: 'def_sorceress_fire',
  def_sorceress_shadow: 'def_sorceress_shadow',
  def_supreme_sorceress_beasts: 'def_supreme_sorceress_beasts',
  def_supreme_sorceress_dark: 'def_supreme_sorceress_dark',
  def_supreme_sorceress_death: 'def_supreme_sorceress_death',
  def_supreme_sorceress_fire: 'def_supreme_sorceress_fire',
  def_supreme_sorceress_shadow: 'def_supreme_sorceress_shadow',
  all_engineer: 'all_engineer',
  all_runesmith: 'all_runesmith',
  dwf_belegar: 'dwf_belegar',
  dwf_grombrindal: 'dwf_grombrindal',
  dwf_lord: 'dwf_lord',
  dwf_master_engineer_ghost: 'dwf_master_engineer_ghost',
  dwf_runelord: 'dwf_runelord',
  dwf_runesmith_ghost: 'dwf_runesmith_ghost',
  dwf_thane: 'dwf_thane',
  dwf_thane_ghost_1: 'dwf_thane_ghost_1',
  dwf_thane_ghost_2: 'dwf_thane_ghost_2',
  dwf_thane_ghost_artifact: 'dwf_thane_ghost_artifact',
  dwf_thorek: 'dwf_thorek',
  dwf_thorgrim: 'dwf_thorgrim',
  dwf_ungrim: 'dwf_ungrim',
  emp_amber_wizard: 'emp_amber_wizard',
  emp_amethyst_wizard: 'emp_amethyst_wizard',
  emp_arch_lector: 'emp_arch_lector',
  emp_balthasar: 'emp_balthasar',
  emp_boris_todbringer: 'emp_boris_todbringer',
  emp_bright_wizard: 'emp_bright_wizard',
  emp_captain: 'emp_captain',
  emp_celestial_wizard: 'emp_celestial_wizard',
  emp_general: 'emp_general',
  emp_hunter_doctor_hertwig_van_hal: 'emp_hunter_doctor_hertwig_van_hal',
  emp_hunter_jorek_grimm_0: 'emp_hunter_jorek_grimm_0',
  emp_hunter_kalara_of_wydrioth_0: 'emp_hunter_kalara_of_wydrioth_0',
  emp_hunter_rodrik_l_anguille_0: 'emp_hunter_rodrik_l_anguille_0',
  emp_karl_franz: 'emp_karl_franz',
  emp_light_wizard: 'emp_light_wizard',
  emp_volkmar: 'emp_volkmar',
  emp_warrior_priest: 'emp_warrior_priest',
  emp_witch_hunter: 'emp_witch_hunter',
  grey_wizard: 'grey_wizard',
  huntsmarshal: 'huntsmarshal',
  jade_wizard: 'jade_wizard',
  markus_wulfhart: 'markus_wulfhart',
  grn_azhag: 'grn_azhag',
  grn_black_orc_big_boss: 'grn_black_orc_big_boss',
  grn_goblin_big_boss: 'grn_goblin_big_boss',
  grn_goblin_great_shaman: 'grn_goblin_great_shaman',
  grn_grimgor: 'grn_grimgor',
  grn_grom_the_paunch: 'grn_grom_the_paunch',
  grn_night_goblin_shaman: 'grn_night_goblin_shaman',
  grn_night_goblin_warboss: 'grn_night_goblin_warboss',
  grn_orc_shaman: 'grn_orc_shaman',
  grn_orc_warboss: 'grn_orc_warboss',
  grn_river_troll_hag: 'grn_river_troll_hag',
  grn_skarsnik: 'grn_skarsnik',
  grn_wurrzag_da_great_prophet: 'grn_wurrzag_da_great_prophet',
  oglok: 'oglok',
  raknik: 'raknik',
  hef_alarielle: 'hef_alarielle',
  hef_alith_anar: 'hef_alith_anar',
  hef_archmage_beasts: 'hef_archmage_beasts',
  hef_archmage_death: 'hef_archmage_death',
  hef_archmage_fire: 'hef_archmage_fire',
  hef_archmage_heavens: 'hef_archmage_heavens',
  hef_archmage_high: 'hef_archmage_high',
  hef_archmage_life: 'hef_archmage_life',
  hef_archmage_light: 'hef_archmage_light',
  hef_archmage_metal: 'hef_archmage_metal',
  hef_archmage_shadows: 'hef_archmage_shadows',
  hef_eltharion: 'hef_eltharion',
  hef_handmaiden: 'hef_handmaiden',
  hef_imrik: 'hef_imrik',
  hef_loremaster_of_hoeth: 'hef_loremaster_of_hoeth',
  hef_mage_beasts: 'hef_mage_beasts',
  hef_mage_death: 'hef_mage_death',
  hef_mage_fire: 'hef_mage_fire',
  hef_mage_heavens: 'hef_mage_heavens',
  hef_mage_high: 'hef_mage_high',
  hef_mage_life: 'hef_mage_life',
  hef_mage_light: 'hef_mage_light',
  hef_mage_metal: 'hef_mage_metal',
  hef_mage_shadows: 'hef_mage_shadows',
  hef_noble: 'hef_noble',
  hef_prince: 'hef_prince',
  hef_princess: 'hef_princess',
  hef_prince_alastar: 'hef_prince_alastar',
  hef_teclis: 'hef_teclis',
  hef_tyrion: 'hef_tyrion',
  kho_cultist: 'kho_cultist',
  kho_skarbrand: 'kho_skarbrand',
  ksl_ataman: 'ksl_ataman',
  ksl_boris: 'ksl_boris',
  ksl_boyar: 'ksl_boyar',
  ksl_frost_maiden_ice: 'ksl_frost_maiden_ice',
  ksl_frost_maiden_tempest: 'ksl_frost_maiden_tempest',
  ksl_ice_witch_ice: 'ksl_ice_witch_ice',
  ksl_ice_witch_tempest: 'ksl_ice_witch_tempest',
  ksl_katarin: 'ksl_katarin',
  ksl_kostaltyn: 'ksl_kostaltyn',
  ksl_patriarch: 'ksl_patriarch',
  ancient_kroxigor: 'ancient_kroxigor',
  gor_rok: 'gor_rok',
  lzd_kroq_gar: 'lzd_kroq_gar',
  lzd_lord_kroak: 'lzd_lord_kroak',
  lzd_lord_mazdamundi: 'lzd_lord_mazdamundi',
  lzd_oxyotl: 'lzd_oxyotl',
  lzd_red_crested_skink_chief: 'lzd_red_crested_skink_chief',
  lzd_saurus_old_blood: 'lzd_saurus_old_blood',
  lzd_saurus_scar_veteran: 'lzd_saurus_scar_veteran',
  lzd_skink_chief: 'lzd_skink_chief',
  lzd_skink_oracle: 'lzd_skink_oracle',
  lzd_skink_priest_beasts: 'lzd_skink_priest_beasts',
  lzd_skink_priest_heavens: 'lzd_skink_priest_heavens',
  lzd_slann_mage_priest: 'lzd_slann_mage_priest',
  lzd_slann_mage_priest_fire: 'lzd_slann_mage_priest_fire',
  lzd_slann_mage_priest_high: 'lzd_slann_mage_priest_high',
  lzd_slann_mage_priest_life: 'lzd_slann_mage_priest_life',
  lzd_tehenhauin: 'lzd_tehenhauin',
  lzd_tiktaqto: 'lzd_tiktaqto',
  nakai: 'nakai',
  nor_arzik: 'nor_arzik',
  nor_burplesmirk_spewpit: 'nor_burplesmirk_spewpit',
  nor_fimir_balefiend_fire: 'nor_fimir_balefiend_fire',
  nor_fimir_balefiend_shadow: 'nor_fimir_balefiend_shadow',
  nor_kihar: 'nor_kihar',
  nor_killgore_slaymaim: 'nor_killgore_slaymaim',
  nor_marauder_chieftain: 'nor_marauder_chieftain',
  nor_shaman_sorcerer_death: 'nor_shaman_sorcerer_death',
  nor_shaman_sorcerer_fire: 'nor_shaman_sorcerer_fire',
  nor_shaman_sorcerer_metal: 'nor_shaman_sorcerer_metal',
  nor_skin_wolf_werekin: 'nor_skin_wolf_werekin',
  nor_throgg: 'nor_throgg',
  nor_wulfrik: 'nor_wulfrik',
  nur_cultist: 'nur_cultist',
  nur_kugath: 'nur_kugath',
  ogr_butcher_beasts: 'ogr_butcher_beasts',
  ogr_butcher_great_maw: 'ogr_butcher_great_maw',
  ogr_firebelly: 'ogr_firebelly',
  ogr_greasus_goldtooth: 'ogr_greasus_goldtooth',
  ogr_hunter: 'ogr_hunter',
  ogr_skrag_the_slaughterer: 'ogr_skrag_the_slaughterer',
  ogr_slaughtermaster_beasts: 'ogr_slaughtermaster_beasts',
  ogr_slaughtermaster_great_maw: 'ogr_slaughtermaster_great_maw',
  ogr_tyrant: 'ogr_tyrant',
  ikit_claw: 'ikit_claw',
  skv_assassin: 'skv_assassin',
  skv_chieftain: 'skv_chieftain',
  skv_deathmaster_snikch: 'skv_deathmaster_snikch',
  skv_eshin_sorcerer: 'skv_eshin_sorcerer',
  skv_ghoritch: 'skv_ghoritch',
  skv_grey_seer_plague: 'skv_grey_seer_plague',
  skv_grey_seer_ruin: 'skv_grey_seer_ruin',
  skv_lord_skrolk: 'skv_lord_skrolk',
  skv_master_assassin: 'skv_master_assassin',
  skv_packmaster: 'skv_packmaster',
  skv_plague_priest: 'skv_plague_priest',
  skv_queek_headtaker: 'skv_queek_headtaker',
  skv_throt_the_unclean: 'skv_throt_the_unclean',
  skv_tretch_craventail: 'skv_tretch_craventail',
  skv_warlock_engineer: 'skv_warlock_engineer',
  skv_warlock_master: 'skv_warlock_master',
  skv_warlord: 'skv_warlord',
  sla_cultist: 'sla_cultist',
  sla_nkari: 'sla_nkari',
  tmb_arkhan: 'tmb_arkhan',
  tmb_khalida: 'tmb_khalida',
  tmb_khatep: 'tmb_khatep',
  tmb_liche_priest_death: 'tmb_liche_priest_death',
  tmb_liche_priest_light: 'tmb_liche_priest_light',
  tmb_liche_priest_nehekhara: 'tmb_liche_priest_nehekhara',
  tmb_liche_priest_shadow: 'tmb_liche_priest_shadow',
  tmb_necrotect: 'tmb_necrotect',
  tmb_settra: 'tmb_settra',
  tmb_tomb_king: 'tmb_tomb_king',
  tmb_tomb_king_alkhazzar_ii: 'tmb_tomb_king_alkhazzar_ii',
  tmb_tomb_king_lahmizzash: 'tmb_tomb_king_lahmizzash',
  tmb_tomb_king_rakhash: 'tmb_tomb_king_rakhash',
  tmb_tomb_king_setep: 'tmb_tomb_king_setep',
  tmb_tomb_king_thutep: 'tmb_tomb_king_thutep',
  tmb_tomb_king_wakhaf: 'tmb_tomb_king_wakhaf',
  tmb_tomb_prince: 'tmb_tomb_prince',
  tze_cultist: 'tze_cultist',
  tze_kairos: 'tze_kairos',
  vmp_banshee: 'vmp_banshee',
  vmp_bloodline_blood_dragon_lord: 'vmp_bloodline_blood_dragon_lord',
  vmp_bloodline_lahmian_lord: 'vmp_bloodline_lahmian_lord',
  vmp_bloodline_necrarch_lord: 'vmp_bloodline_necrarch_lord',
  vmp_bloodline_strigoi_lord: 'vmp_bloodline_strigoi_lord',
  vmp_bloodline_von_carstein_lord: 'vmp_bloodline_von_carstein_lord',
  vmp_heinrich: 'vmp_heinrich',
  vmp_helman_ghorst: 'vmp_helman_ghorst',
  vmp_isabella_von_carstein: 'vmp_isabella_von_carstein',
  vmp_isabella_von_carstein_hero: 'vmp_isabella_von_carstein_hero',
  vmp_kevon_lloydstein: 'vmp_kevon_lloydstein',
  vmp_lord: 'vmp_lord',
  vmp_mannfred: 'vmp_mannfred',
  vmp_master_necromancer: 'vmp_master_necromancer',
  vmp_necromancer: 'vmp_necromancer',
  vmp_red_duke: 'vmp_red_duke',
  vmp_strigoi_ghoul_king: 'vmp_strigoi_ghoul_king',
  vmp_vampire: 'vmp_vampire',
  vmp_vampire_shadow: 'vmp_vampire_shadow',
  vmp_vlad_von_carstein: 'vmp_vlad_von_carstein',
  vmp_vlad_von_carstein_hero: 'vmp_vlad_von_carstein_hero',
  vmp_wight_king: 'vmp_wight_king',
  wef_ancient_treeman: 'wef_ancient_treeman',
  wef_ariel: 'wef_ariel',
  wef_branchwraith: 'wef_branchwraith',
  wef_coeddil: 'wef_coeddil',
  wef_drycha: 'wef_drycha',
  wef_durthu: 'wef_durthu',
  wef_glade_captain: 'wef_glade_captain',
  wef_glade_lord: 'wef_glade_lord',
  wef_glade_lord_fem: 'wef_glade_lord_fem',
  wef_malicious_ancient_treeman_beasts: 'wef_malicious_ancient_treeman_beasts',
  wef_malicious_ancient_treeman_life: 'wef_malicious_ancient_treeman_life',
  wef_malicious_ancient_treeman_shadows: 'wef_malicious_ancient_treeman_shadows',
  wef_malicious_branchwraith_beasts: 'wef_malicious_branchwraith_beasts',
  wef_malicious_branchwraith_life: 'wef_malicious_branchwraith_life',
  wef_malicious_branchwraith_shadows: 'wef_malicious_branchwraith_shadows',
  wef_orion: 'wef_orion',
  wef_sisters_of_twilight: 'wef_sisters_of_twilight',
  wef_spellsinger_beasts: 'wef_spellsinger_beasts',
  wef_spellsinger_life: 'wef_spellsinger_life',
  wef_spellsinger_shadow: 'wef_spellsinger_shadow',
  wef_spellweaver_beasts: 'wef_spellweaver_beasts',
  wef_spellweaver_dark: 'wef_spellweaver_dark',
  wef_spellweaver_high: 'wef_spellweaver_high',
  wef_spellweaver_life: 'wef_spellweaver_life',
  wef_spellweaver_shadows: 'wef_spellweaver_shadows',
  wef_waystalker: 'wef_waystalker',

  chd_astragoth: 'chd_astragoth',
  chd_drazhoath: 'chd_drazhoath',
  chd_zhatan: 'chd_zhatan',
  chd_lord_convoy_overseer: 'chd_lord_convoy_overseer',
  chd_overseer: 'chd_overseer',
  chd_sorcerer_prophet_death: 'chd_sorcerer_prophet_death',
  chd_sorcerer_prophet_fire: 'chd_sorcerer_prophet_fire',
  chd_sorcerer_prophet_hashut: 'chd_sorcerer_prophet_hashut',
  chd_sorcerer_prophet_metal: 'chd_sorcerer_prophet_metal',
  chd_gorduz_backstabber: 'chd_gorduz_backstabber',
  chd_bull_centaur_taurruk: 'chd_bull_centaur_taurruk',
  chd_daemonsmith_sorcerer_death: 'chd_daemonsmith_sorcerer_death',
  chd_daemonsmith_sorcerer_fire: 'chd_daemonsmith_sorcerer_fire',
  chd_daemonsmith_sorcerer_hashut: 'chd_daemonsmith_sorcerer_hashut',
  chd_daemonsmith_sorcerer_metal: 'chd_daemonsmith_sorcerer_metal',
  chd_infernal_castellan: 'chd_infernal_castellan',
  ksl_ulrika: 'ksl_ulrika',

  chs_cha_harald_hammerstorm: 'chs_cha_harald_hammerstorm',

  cth_celestial_general_yang: 'cth_celestial_general_yang',
  cth_celestial_general_yin: 'cth_celestial_general_yin',
  cth_yuan_bo: 'cth_yuan_bo',
  ksl_hag_witch_beasts: 'ksl_hag_witch_beasts',
  ksl_hag_witch_death: 'ksl_hag_witch_death',
  ksl_hag_witch_shadows: 'ksl_hag_witch_shadows',
  ksl_mother_ostankya: 'ksl_mother_ostankya',
  tze_aekold_helbrass: 'tze_aekold_helbrass',
  tze_blue_scribes: 'tze_blue_scribes',
  tze_the_changeling: 'tze_the_changeling',

  lzd_slann_mage_priest_beasts: 'lzd_slann_mage_priest_beasts',
  lzd_slann_mage_priest_death: 'lzd_slann_mage_priest_death',
  lzd_slann_mage_priest_heavens: 'lzd_slann_mage_priest_heavens',
  lzd_slann_mage_priest_metal: 'lzd_slann_mage_priest_metal',
  lzd_slann_mage_priest_shadows: 'lzd_slann_mage_priest_shadows',

  chs_lord_mtze: 'chs_lord_mtze',
  chs_exalted_hero_mtze: 'chs_exalted_hero_mtze',
  cth_gate_master: 'cth_gate_master',
  cth_saytang_the_watcher: 'cth_saytang_the_watcher',
  ksl_druzhina: 'ksl_druzhina',
  ksl_hag_witch_hag: 'ksl_hag_witch_hag',
  ksl_the_golden_knight: 'ksl_the_golden_knight',
};

export default vanillaCharacters;
