# TotalWarhammerDataParser
 
Requires RPFM (or at least the cli) to be available under ./rpfm

Uses NConvert and a webp plugin from XnConvert to convert images and strip metadata.

A saner person would probably have rebuilt the DB instead.

Reverse engineered DB schema (kinda rough and not totally complete, but handy reference): https://dbdiagram.io/d/6212fade485e433543e7fe91

When CA adds weird stuff that probably needs new tables (like mounts getting autoleveled) check https://github.com/Frodo45127/rpfm-schemas commits to look through table changes.

## Keep any eye on

- WH3 Oxyotl and Mazdamundi have item ancillaries that still exist in skill tree. If more mods utilize ancilllaries in skill trees could link them properly.
- Prune more props not used in frontend to save file size
- Can probably prune glade_lord_fem, just keeping in case mods do something with it?

## How To Use

- Ensure an updated version of rpfm exists in ./rpfm
- Check absolute file paths in ./bins/copySource.bat for copying game/mod files from their install locations
- Make sure all mods are downloaded
- With rpfm (ui) rename all sfo2 locs that start with * to # because rpfm cant handle the * -_-
- npm run fullBuild (fullBuildProd if you dont care about pretty printed json)
- Extracted character skill trees and images will be in the ./output and ./output_img folders as parsed json and webp's

## Image Extraction

Required image folders (M) need to be manually checked, rest should be in ./output_img:
- skilltree related:
- ui/battle ui/ability_icons/
- ui/campaign ui/effect_bundles/
- ui/campaign ui/skills/
- (M) ui/skins/default/icon_stat_*
- flags/characters:
- (M) ui/flags
- (M) ui/portraits/portholes

WH3 also needs
- (M) ui/skins/default/modifier_icon_*
- (M) ui/battle ui/ability_icons/resistance_* (put with the skins/default)
- (M) ui/campaign ui/skills/item_arcane_item (from WH2, missing from 3)

WH2 has a lot of placeholder ui/skins/default that get hardcode fixed. So copy over imgs in that folder from WH3.

XnConvert webp settings for different conversions:
- skilltree related: quality 90
- flags: lossless
- characters quality 90

Warhammer 3 character portholes arent circularized like wh2/1, can use imagemagick to automate cropping/circularizing them. Note the mask is strangely sized, for whatever reason thats what results in a 164x164 output. The mask also loses inner transparency for black, which then gets replaced, so watch for image artifacts. Can try faffing around with using pink instead?

magick -size 165x166 xc:Transparent -fill White -draw 'circle 83 83 83 1' -alpha Copy mask.png

$files = Get-ChildItem ".\example\"
foreach ($f in $files){
magick .\example\${f} -gravity Center mask.png -compose CopyOpacity -composite -trim -transparent Black .\out\${f}
}

Alternatively use xnconvert actions or gimp if transparency gets munted.

## Adding a mod

- Add relevant robocopies in the copySource.bat
- Check if the mod uses any * in table names, rpfm chokes on that character to rename it to something like #
- Create new extract lists such as ./extractLists/radious3.js, the only time you need to explicitly set the locList like old sfo2 is if rpfm chokes on any table names
- Add a new workerMod to the mods base game worker (worker2/worker3)
- Check for characters in agent_subtypes that arent in faction_agent_permitted_subtypes, add to ./lists/addFactionAgents.js
- Check for bugs, especially in string replacements.
- Check for manually extracted image paths: 
- ui/skins/default/fe_logo.png
- ui/skins/default/icon_stat_*
- ui/flags
- ui/portraits/portholes
WH3 also needs
- ui/skins/default/modifier_icon_*
- ui/battle ui/ability_icons/resistance_* (put with the skins/default)
- Use the above image conversion settings/scripts appropriately
- Copy extracted data TWPData repo
- Copy extracted imgs TotalWarhammerPlanner repo frontend/public/imgs

## Character Skill Node Faction/Subcultures

Skill nodes are able to only be added to trees when they are part of specific factions or subcultures. Mods use this somewhat inconsistently where sometimes its good they aren't added to the "generic" node set, but sometimes they should be. It seems like the former is more common, so if a tree needs it added to the "generic" node set add the faction/subculture to the respective ./lists/cultureMap.js

## Techs

For Sigmar knows what reason tech indents start at -2, I realigned them to start at 0 for easier array usage. So all indents in output data will be 2 higher than in packs.

## Potential Automation

If enough monthly donations can look at upgrading the droplet to something that could handle running the data parser builds (~4GB mem, ~100GB storage). Use steamcmd to grab workshop files every x interval, if they changed trigger a rebuild. Would probably want to properly automate portrait extraction/linking.
