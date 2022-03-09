:: Clear any data from previous extracts
RD /S /Q D:\GitHub\TotalWarhammerDataParser\extracted_files\sfo
cd ../
mkdir extracted_files\sfo
cd ./rpfm

:: Extract tables from packfiles
rpfm_cli.exe -g warhammer_2 -p "../game_source/sfo/steel_faith_overhaul_2.pack" packfile -E "../extracted_files/sfo" - "db/character_skill_node_sets_tables"
rpfm_cli.exe -g warhammer_2 -p "../game_source/sfo/steel_faith_overhaul_2.pack" packfile -E "../extracted_files/sfo" - "db/character_skills_tables"
rpfm_cli.exe -g warhammer_2 -p "../game_source/sfo/steel_faith_overhaul_2.pack" packfile -E "../extracted_files/sfo" - "db/character_skill_level_details_tables"
rpfm_cli.exe -g warhammer_2 -p "../game_source/sfo/steel_faith_overhaul_2.pack" packfile -E "../extracted_files/sfo" - "db/character_skill_nodes_tables"
rpfm_cli.exe -g warhammer_2 -p "../game_source/sfo/steel_faith_overhaul_2.pack" packfile -E "../extracted_files/sfo" - "db/character_skill_node_links_tables"
rpfm_cli.exe -g warhammer_2 -p "../game_source/sfo/steel_faith_overhaul_2.pack" packfile -E "../extracted_files/sfo" - "db/character_skill_nodes_skill_locks_tables"
rpfm_cli.exe -g warhammer_2 -p "../game_source/sfo/steel_faith_overhaul_2.pack" packfile -E "../extracted_files/sfo" - "db/effects_tables"
rpfm_cli.exe -g warhammer_2 -p "../game_source/sfo/steel_faith_overhaul_2.pack" packfile -E "../extracted_files/sfo" - "db/character_skill_level_to_effects_junctions_tables"
rpfm_cli.exe -g warhammer_2 -p "../game_source/sfo/steel_faith_overhaul_2.pack" packfile -E "../extracted_files/sfo" - "db/ancillary_to_effects_tables"
rpfm_cli.exe -g warhammer_2 -p "../game_source/sfo/steel_faith_overhaul_2.pack" packfile -E "../extracted_files/sfo" - "db/ancillaries_tables"
rpfm_cli.exe -g warhammer_2 -p "../game_source/sfo/steel_faith_overhaul_2.pack" packfile -E "../extracted_files/sfo" - "db/character_skill_level_to_ancillaries_junctions_tables"
rpfm_cli.exe -g warhammer_2 -p "../game_source/sfo/steel_faith_overhaul_2.pack" packfile -E "../extracted_files/sfo" - "db/character_skills_to_quest_ancillaries_tables"
rpfm_cli.exe -g warhammer_2 -p "../game_source/sfo/steel_faith_overhaul_2.pack" packfile -E "../extracted_files/sfo" - "db/faction_agent_permitted_subtypes_tables"
rpfm_cli.exe -g warhammer_2 -p "../game_source/sfo/steel_faith_overhaul_2.pack" packfile -E "../extracted_files/sfo" - "db/factions_tables"
rpfm_cli.exe -g warhammer_2 -p "../game_source/sfo/steel_faith_overhaul_2.pack" packfile -E "../extracted_files/sfo" - "db/cultures_subcultures_tables"
rpfm_cli.exe -g warhammer_2 -p "../game_source/sfo/steel_faith_overhaul_2.pack" packfile -E "../extracted_files/sfo" - "db/cultures_tables"
rpfm_cli.exe -g warhammer_2 -p "../game_source/sfo/steel_faith_overhaul_2.pack" packfile -E "../extracted_files/sfo" - "db/unit_attributes_tables"
rpfm_cli.exe -g warhammer_2 -p "../game_source/sfo/steel_faith_overhaul_2.pack" packfile -E "../extracted_files/sfo" - "db/special_ability_phase_attribute_effects_tables"
rpfm_cli.exe -g warhammer_2 -p "../game_source/sfo/steel_faith_overhaul_2.pack" packfile -E "../extracted_files/sfo" - "db/special_ability_phase_stat_effects_tables"
rpfm_cli.exe -g warhammer_2 -p "../game_source/sfo/steel_faith_overhaul_2.pack" packfile -E "../extracted_files/sfo" - "db/special_ability_phases_tables"
rpfm_cli.exe -g warhammer_2 -p "../game_source/sfo/steel_faith_overhaul_2.pack" packfile -E "../extracted_files/sfo" - "db/special_ability_to_special_ability_phase_junctions_tables"
rpfm_cli.exe -g warhammer_2 -p "../game_source/sfo/steel_faith_overhaul_2.pack" packfile -E "../extracted_files/sfo" - "db/unit_special_abilities_tables"
rpfm_cli.exe -g warhammer_2 -p "../game_source/sfo/steel_faith_overhaul_2.pack" packfile -E "../extracted_files/sfo" - "db/unit_ability_types_tables"
rpfm_cli.exe -g warhammer_2 -p "../game_source/sfo/steel_faith_overhaul_2.pack" packfile -E "../extracted_files/sfo" - "db/unit_abilities_additional_ui_effects_tables"
rpfm_cli.exe -g warhammer_2 -p "../game_source/sfo/steel_faith_overhaul_2.pack" packfile -E "../extracted_files/sfo" - "db/unit_abilities_to_additional_ui_effects_juncs_tables"
rpfm_cli.exe -g warhammer_2 -p "../game_source/sfo/steel_faith_overhaul_2.pack" packfile -E "../extracted_files/sfo" - "db/unit_abilities_tables"
rpfm_cli.exe -g warhammer_2 -p "../game_source/sfo/steel_faith_overhaul_2.pack" packfile -E "../extracted_files/sfo" - "db/effect_bonus_value_unit_ability_junctions_tables"

rpfm_cli.exe -g warhammer_2 -p "../game_source/sfo/steel_faith_overhaul_2.pack" packfile -e "../extracted_files/sfo" - "text/db/#SFO_character_skills.loc"
rpfm_cli.exe -g warhammer_2 -p "../game_source/sfo/steel_faith_overhaul_2.pack" packfile -e "../extracted_files/sfo" - "text/db/#SFO_effects__.loc"
rpfm_cli.exe -g warhammer_2 -p "../game_source/sfo/steel_faith_overhaul_2.pack" packfile -e "../extracted_files/sfo" - "text/db/jmw_norsca_navy_effects.loc"
rpfm_cli.exe -g warhammer_2 -p "../game_source/sfo/steel_faith_overhaul_2.pack" packfile -e "../extracted_files/sfo" - "text/db/twh_emp_effects__.loc"
rpfm_cli.exe -g warhammer_2 -p "../game_source/sfo/steel_faith_overhaul_2.pack" packfile -e "../extracted_files/sfo" - "text/db/zar_sk_effects__.loc"
rpfm_cli.exe -g warhammer_2 -p "../game_source/sfo/steel_faith_overhaul_2.pack" packfile -e "../extracted_files/sfo" - "text/db/#SFO_ancillaries__.loc"
rpfm_cli.exe -g warhammer_2 -p "../game_source/sfo/steel_faith_overhaul_2.pack" packfile -e "../extracted_files/sfo" - "text/db/zar_emp_ancillaries__.loc"
rpfm_cli.exe -g warhammer_2 -p "../game_source/sfo/steel_faith_overhaul_2.pack" packfile -e "../extracted_files/sfo" - "text/db/zar_sk_ancillaries__.loc"
:: rpfm_cli.exe -g warhammer_2 -p "../game_source/sfo/steel_faith_overhaul_2.pack" packfile -e "../extracted_files/sfo" - "text/db/cultures__.loc"
rpfm_cli.exe -g warhammer_2 -p "../game_source/sfo/steel_faith_overhaul_2.pack" packfile -e "../extracted_files/sfo" - "text/db/#SFO_unit_attributes__.loc"
:: rpfm_cli.exe -g warhammer_2 -p "../game_source/sfo/steel_faith_overhaul_2.pack" packfile -e "../extracted_files/sfo" - "text/db/unit_stat_localisations__.loc"
:: rpfm_cli.exe -g warhammer_2 -p "../game_source/sfo/steel_faith_overhaul_2.pack" packfile -e "../extracted_files/sfo" - "text/db/unit_ability_types__.loc"
rpfm_cli.exe -g warhammer_2 -p "../game_source/sfo/steel_faith_overhaul_2.pack" packfile -e "../extracted_files/sfo" - "text/db/#SFO_unit_abilities_additional_ui_effects__.loc"
rpfm_cli.exe -g warhammer_2 -p "../game_source/sfo/steel_faith_overhaul_2.pack" packfile -e "../extracted_files/sfo" - "text/db/#SFO_unit_unit_abilities.loc"
rpfm_cli.exe -g warhammer_2 -p "../game_source/sfo/steel_faith_overhaul_2.pack" packfile -e "../extracted_files/sfo" - "text/db/jmw_norsca_navy_unit_abilities.loc"

:: Modded tables are generally wonky names, and often split into multiple tables per folder.
:: Talking to rpfm creator it should extract directly to TSV's but isn't currently so have to programatically call to export all the tsv's.
EXIT /B 0
