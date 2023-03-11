set steamPath=D:\Steam\steamapps\common
set workshopPath=D:\Steam\steamapps\workshop\content
set gitGameSource=D:\GitHub\TotalWarhammerDataParser\game_source

set schemaAppdataPath=C:\Users\fearh\AppData\Roaming\FrodoWazEre\rpfm\config\schemas
set schemaGitPath=D:\GitHub\TotalWarhammerDataParser\rpfm\schemas

ROBOCOPY "%steamPath%\Total War WARHAMMER II\data" "%gitGameSource%\vanilla2" data.pack local_en.pack /NJH /NJS
ROBOCOPY "%workshopPath%\594570\1149625355" "%gitGameSource%\sfo2" steel_faith_overhaul_2.pack /NJH /NJS
ROBOCOPY "%workshopPath%\594570\1149634389" "%gitGameSource%\radious2" radious_total_war_mod_part1.pack /NJH /NJS
ROBOCOPY "%workshopPath%\594570\1149634634" "%gitGameSource%\radious2" radious_total_war_mod_part2.pack /NJH /NJS
ROBOCOPY "%workshopPath%\594570\1672224407" "%gitGameSource%\radious2" !sm_radious_hordes_reborn.pack /NJH /NJS

ROBOCOPY "%steamPath%\Total War WARHAMMER III\data" "%gitGameSource%\vanilla3" data.pack data_1.pack data_2.pack data_3.pack data_bl.pack data_bm.pack data_sc.pack data_sf.pack data_tk.pack data_we.pack data_wp_.pack local_en.pack /NJH /NJS
ROBOCOPY "%workshopPath%\1142710\2802810577" "%gitGameSource%\mixu3" ab_mixu_legendary_lords.pack /NJH /NJS
ROBOCOPY "%workshopPath%\1142710\2825728189" "%gitGameSource%\mixu3" ab_unwashed_masses.pack /NJH /NJS
ROBOCOPY "%workshopPath%\1142710\2853477423" "%gitGameSource%\mixu3" ab_mixu_slayer.pack /NJH /NJS
ROBOCOPY "%workshopPath%\1142710\2933920316" "%gitGameSource%\mixu3" ab_mixu_shadowdancer.pack /NJH /NJS
ROBOCOPY "%workshopPath%\1142710\2791750313" "%gitGameSource%\radious3" Radious_WH3_Mod_Part1.pack /NJH /NJS
ROBOCOPY "%workshopPath%\1142710\2791750896" "%gitGameSource%\radious3" Radious_WH3_Mod_Part2.pack /NJH /NJS
ROBOCOPY "%workshopPath%\1142710\2791750075" "%gitGameSource%\radious3" Radious_WH3_Mod_Part3.pack /NJH /NJS
ROBOCOPY "%workshopPath%\1142710\2813892035" "%gitGameSource%\radious3" Radious_WH3_Mod_Part4.pack /NJH /NJS
ROBOCOPY "%workshopPath%\1142710\2792731173" "%gitGameSource%\sfo3" sfo_grimhammer_3_main.pack /NJH /NJS
ROBOCOPY "%workshopPath%\1142710\2826930183" "%gitGameSource%\lege3" !str_legendary.pack /NJH /NJS
ROBOCOPY "%workshopPath%\1142710\2880244265" "%gitGameSource%\crys3" crys_leaders.pack /NJH /NJS
ROBOCOPY "%workshopPath%\1142710\2880515805" "%gitGameSource%\scm3" jade_vamp_pol.pack /NJH /NJS
ROBOCOPY "%workshopPath%\1142710\2891621259" "%gitGameSource%\scm3" dead_cult_possessed_unit_V2.pack /NJH /NJS
ROBOCOPY "%workshopPath%\1142710\2860291758" "%gitGameSource%\scm3" froeb_warboss_lord.pack /NJH /NJS
ROBOCOPY "%workshopPath%\1142710\2790444587" "%gitGameSource%\scm3" dead_jade_army_pack.pack /NJH /NJS
ROBOCOPY "%workshopPath%\1142710\2789944159" "%gitGameSource%\scm3" dead_kislev_units.pack /NJH /NJS
ROBOCOPY "%workshopPath%\1142710\2890463744" "%gitGameSource%\scm3" @xou_emp.pack /NJH /NJS
ROBOCOPY "%workshopPath%\1142710\2890463783" "%gitGameSource%\scm3" @xou_emp_assets.pack /NJH /NJS
ROBOCOPY "%workshopPath%\1142710\2874009018" "%gitGameSource%\scm3" !hkrul_emp_secessionists.pack /NJH /NJS
ROBOCOPY "%workshopPath%\1142710\2824164139" "%gitGameSource%\scm3" !xou_khorne_karanak.pack /NJH /NJS
ROBOCOPY "%workshopPath%\1142710\2803817483" "%gitGameSource%\scm3" !xou_kislev_ivan.pack /NJH /NJS
ROBOCOPY "%workshopPath%\1142710\2903601772" "%gitGameSource%\scm3" !!!str_pestilent.pack /NJH /NJS
ROBOCOPY "%workshopPath%\1142710\2838941228" "%gitGameSource%\scm3" str_rotblood.pack /NJH /NJS
ROBOCOPY "%workshopPath%\1142710\2809422989" "%gitGameSource%\scm3" str_gnoblar.pack /NJH /NJS
ROBOCOPY "%workshopPath%\1142710\2918562980" "%gitGameSource%\scm3" str_verms.pack /NJH /NJS
ROBOCOPY "%workshopPath%\1142710\2925447605" "%gitGameSource%\scm3" str_treecherik.pack /NJH /NJS

ROBOCOPY "%schemaAppdataPath%" "%schemaGitPath%" schema_wh2.ron schema_wh3.ron /NJH /NJS
EXIT /B
