:: Clear any data from previous extracts
RD /S /Q D:\GitHub\TotalWarhammerDataParser\extracted_files\vanilla
cd ../
mkdir extracted_files\vanilla
cd ./rpfm

:: Extract tables from packfiles
rpfm_cli.exe -g warhammer_2 -p "../game_source/vanilla/data.pack" packfile -e "../extracted_files/vanilla" - "db/character_skill_node_sets_tables/data__"
rpfm_cli.exe -g warhammer_2 -p "../game_source/vanilla/data.pack" packfile -e "../extracted_files/vanilla" - "db/character_skills_tables/data__"
rpfm_cli.exe -g warhammer_2 -p "../game_source/vanilla/data.pack" packfile -e "../extracted_files/vanilla" - "db/character_skill_level_details_tables/data__"
rpfm_cli.exe -g warhammer_2 -p "../game_source/vanilla/data.pack" packfile -e "../extracted_files/vanilla" - "db/character_skill_nodes_tables/data__"
rpfm_cli.exe -g warhammer_2 -p "../game_source/vanilla/data.pack" packfile -e "../extracted_files/vanilla" - "db/character_skill_node_links_tables/data__"
rpfm_cli.exe -g warhammer_2 -p "../game_source/vanilla/data.pack" packfile -e "../extracted_files/vanilla" - "db/character_skill_nodes_skill_locks_tables/data__"
rpfm_cli.exe -g warhammer_2 -p "../game_source/vanilla/data.pack" packfile -e "../extracted_files/vanilla" - "db/effects_tables/data__"
:: rpfm_cli.exe -g warhammer_2 -p "../game_source/vanilla/data.pack" packfile -e "../extracted_files/vanilla" - "db/unit_abilities_tables/data__"
:: rpfm_cli.exe -g warhammer_2 -p "../game_source/vanilla/data.pack" packfile -e "../extracted_files/vanilla" - "db/effect_bonus_value_unit_ability_junctions_tables/data__"
rpfm_cli.exe -g warhammer_2 -p "../game_source/vanilla/data.pack" packfile -e "../extracted_files/vanilla" - "db/character_skill_level_to_effects_junctions_tables/data__"
rpfm_cli.exe -g warhammer_2 -p "../game_source/vanilla/data.pack" packfile -e "../extracted_files/vanilla" - "db/ancillary_to_effects_tables/data__"
rpfm_cli.exe -g warhammer_2 -p "../game_source/vanilla/data.pack" packfile -e "../extracted_files/vanilla" - "db/ancillaries_tables/data__"
rpfm_cli.exe -g warhammer_2 -p "../game_source/vanilla/data.pack" packfile -e "../extracted_files/vanilla" - "db/character_skill_level_to_ancillaries_junctions_tables/data__"
rpfm_cli.exe -g warhammer_2 -p "../game_source/vanilla/data.pack" packfile -e "../extracted_files/vanilla" - "db/character_skills_to_quest_ancillaries_tables/data__"
rpfm_cli.exe -g warhammer_2 -p "../game_source/vanilla/data.pack" packfile -e "../extracted_files/vanilla" - "db/faction_agent_permitted_subtypes_tables/data__"
rpfm_cli.exe -g warhammer_2 -p "../game_source/vanilla/data.pack" packfile -e "../extracted_files/vanilla" - "db/factions_tables/data__"
rpfm_cli.exe -g warhammer_2 -p "../game_source/vanilla/data.pack" packfile -e "../extracted_files/vanilla" - "db/cultures_subcultures_tables/data__"
rpfm_cli.exe -g warhammer_2 -p "../game_source/vanilla/data.pack" packfile -e "../extracted_files/vanilla" - "db/cultures_tables/data__"

rpfm_cli.exe -g warhammer_2 -p "../game_source/vanilla/local_en.pack" packfile -e "../extracted_files/vanilla" - "text/db/character_skills__.loc"
rpfm_cli.exe -g warhammer_2 -p "../game_source/vanilla/local_en.pack" packfile -e "../extracted_files/vanilla" - "text/db/effects__.loc"
:: rpfm_cli.exe -g warhammer_2 -p "../game_source/vanilla/local_en.pack" packfile -e "../extracted_files/vanilla" - "text/db/unit_abilities__.loc"
rpfm_cli.exe -g warhammer_2 -p "../game_source/vanilla/local_en.pack" packfile -e "../extracted_files/vanilla" - "text/db/ancillaries__.loc"
rpfm_cli.exe -g warhammer_2 -p "../game_source/vanilla/local_en.pack" packfile -e "../extracted_files/vanilla" - "text/db/cultures__.loc"


:: Export tables as TSV's
rpfm_cli.exe -g warhammer_2 table -e "../extracted_files/vanilla/db/character_skill_node_sets_tables/data__"
rpfm_cli.exe -g warhammer_2 table -e "../extracted_files/vanilla/db/character_skills_tables/data__"
rpfm_cli.exe -g warhammer_2 table -e "../extracted_files/vanilla/db/character_skill_level_details_tables/data__"
rpfm_cli.exe -g warhammer_2 table -e "../extracted_files/vanilla/db/character_skill_nodes_tables/data__"
rpfm_cli.exe -g warhammer_2 table -e "../extracted_files/vanilla/db/character_skill_node_links_tables/data__"
rpfm_cli.exe -g warhammer_2 table -e "../extracted_files/vanilla/db/character_skill_nodes_skill_locks_tables/data__"
rpfm_cli.exe -g warhammer_2 table -e "../extracted_files/vanilla/db/effects_tables/data__"
:: rpfm_cli.exe -g warhammer_2 table -e "../extracted_files/vanilla/db/unit_abilities_tables/data__"
:: rpfm_cli.exe -g warhammer_2 table -e "../extracted_files/vanilla/db/effect_bonus_value_unit_ability_junctions_tables/data__"
rpfm_cli.exe -g warhammer_2 table -e "../extracted_files/vanilla/db/character_skill_level_to_effects_junctions_tables/data__"
rpfm_cli.exe -g warhammer_2 table -e "../extracted_files/vanilla/db/ancillary_to_effects_tables/data__"
rpfm_cli.exe -g warhammer_2 table -e "../extracted_files/vanilla/db/ancillaries_tables/data__"
rpfm_cli.exe -g warhammer_2 table -e "../extracted_files/vanilla/db/character_skill_level_to_ancillaries_junctions_tables/data__"
rpfm_cli.exe -g warhammer_2 table -e "../extracted_files/vanilla/db/character_skills_to_quest_ancillaries_tables/data__"
rpfm_cli.exe -g warhammer_2 table -e "../extracted_files/vanilla/db/faction_agent_permitted_subtypes_tables/data__"
rpfm_cli.exe -g warhammer_2 table -e "../extracted_files/vanilla/db/factions_tables/data__"
rpfm_cli.exe -g warhammer_2 table -e "../extracted_files/vanilla/db/cultures_subcultures_tables/data__"
rpfm_cli.exe -g warhammer_2 table -e "../extracted_files/vanilla/db/cultures_tables/data__"

rpfm_cli.exe -g warhammer_2 table -e "../extracted_files/vanilla/text/db/character_skills__.loc"
rpfm_cli.exe -g warhammer_2 table -e "../extracted_files/vanilla/text/db/effects__.loc"
:: rpfm_cli.exe -g warhammer_2 table -e "../extracted_files/vanilla/text/db/unit_abilities__.loc"
rpfm_cli.exe -g warhammer_2 table -e "../extracted_files/vanilla/text/db/ancillaries__.loc"
rpfm_cli.exe -g warhammer_2 table -e "../extracted_files/vanilla/text/db/cultures__.loc"

EXIT /B 0
