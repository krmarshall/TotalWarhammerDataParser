set steamPath=D:\Steam\steamapps\common
set workshopPath=D:\Steam\steamapps\workshop\content
set gitGameSource=D:\GitHub\TotalWarhammerDataParser\game_source

ROBOCOPY "%steamPath%\Total War WARHAMMER II\data" "%gitGameSource%\vanilla2" data.pack local_en.pack /NJH /NJS

ROBOCOPY "%steamPath%\Total War WARHAMMER III\data" "%gitGameSource%\vanilla3" data.pack data_1.pack data_2.pack data_3.pack data_bl.pack data_bm.pack data_sc.pack data_sf.pack data_tk.pack data_we.pack data_wp_.pack local_en.pack /NJH /NJS

ROBOCOPY "%workshopPath%\1142710\2802810577" "%gitGameSource%\mixu3" ab_mixu_legendary_lords.pack /NJH /NJS
ROBOCOPY "%workshopPath%\1142710\2825728189" "%gitGameSource%\mixu3" ab_unwashed_masses.pack /NJH /NJS
ROBOCOPY "%workshopPath%\1142710\2853477423" "%gitGameSource%\mixu3" ab_mixu_slayer.pack /NJH /NJS
ROBOCOPY "%workshopPath%\1142710\2933920316" "%gitGameSource%\mixu3" ab_mixu_shadowdancer.pack /NJH /NJS
ROBOCOPY "%workshopPath%\1142710\2985441419" "%gitGameSource%\mixu3" ab_mixu_mousillon.pack /NJH /NJS

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
ROBOCOPY "%workshopPath%\1142710\2973289132" "%gitGameSource%\scm3" dead_kislev_hero_shaman.pack /NJH /NJS
ROBOCOPY "%workshopPath%\1142710\2973289038" "%gitGameSource%\scm3" dead_kislev_hero_blademaster.pack /NJH /NJS
ROBOCOPY "%workshopPath%\1142710\2890463744" "%gitGameSource%\scm3" @xou_emp.pack /NJH /NJS
ROBOCOPY "%workshopPath%\1142710\2890463783" "%gitGameSource%\scm3" @xou_emp_assets.pack /NJH /NJS
ROBOCOPY "%workshopPath%\1142710\2874009018" "%gitGameSource%\scm3" !hkrul_emp_secessionists.pack /NJH /NJS
ROBOCOPY "%workshopPath%\1142710\2824164139" "%gitGameSource%\scm3" !xou_khorne_karanak.pack /NJH /NJS
ROBOCOPY "%workshopPath%\1142710\2803817483" "%gitGameSource%\scm3" !xou_kislev_ivan.pack /NJH /NJS
ROBOCOPY "%workshopPath%\1142710\2838941228" "%gitGameSource%\scm3" str_rotblood.pack /NJH /NJS
ROBOCOPY "%workshopPath%\1142710\2809422989" "%gitGameSource%\scm3" str_gnoblar.pack /NJH /NJS
ROBOCOPY "%workshopPath%\1142710\2949216752" "%gitGameSource%\scm3" !hkrul_marienburg_v1.0.pack /NJH /NJS
ROBOCOPY "%workshopPath%\1142710\2989226363" "%gitGameSource%\scm3" cth_yinyin_pol.pack /NJH /NJS
ROBOCOPY "%workshopPath%\1142710\2991431203" "%gitGameSource%\scm3" AAA_dynasty_of_the_damned.pack /NJH /NJS
ROBOCOPY "%workshopPath%\1142710\2986543735" "%gitGameSource%\scm3" str_skaven_clans.pack /NJH /NJS
ROBOCOPY "%workshopPath%\1142710\3007387103" "%gitGameSource%\scm3" str_garbag.pack /NJH /NJS
ROBOCOPY "%workshopPath%\1142710\3025827638" "%gitGameSource%\scm3" dead_gate_master.pack /NJH /NJS

ROBOCOPY "%workshopPath%\1142710\2927296206" "%gitGameSource%\cat3" !ak_teb3.pack /NJH /NJS
ROBOCOPY "%workshopPath%\1142710\2968330247" "%gitGameSource%\cat3" !ak_seapatrol.pack /NJH /NJS
ROBOCOPY "%workshopPath%\1142710\2878423760" "%gitGameSource%\cat3" !ak_kraka3.pack /NJH /NJS

ROBOCOPY "%workshopPath%\1142710\2873961274" "%gitGameSource%\ovn3" ovn_albion.pack /NJH /NJS
ROBOCOPY "%workshopPath%\1142710\2899955636" "%gitGameSource%\ovn3" ovn_fimir.pack /NJH /NJS
ROBOCOPY "%workshopPath%\1142710\2950121489" "%gitGameSource%\ovn3" ovn_citadel_of_dusk.pack /NJH /NJS
ROBOCOPY "%workshopPath%\1142710\2989710828" "%gitGameSource%\ovn3" ovn_grudgebringers.pack /NJH /NJS
ROBOCOPY "%workshopPath%\1142710\3016830682" "%gitGameSource%\ovn3" ovn_dread_king.pack /NJH /NJS

EXIT /B
