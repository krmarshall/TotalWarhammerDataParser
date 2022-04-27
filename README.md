# TotalWarhammerDataParser
 
Requires RPFM (or at least the cli) to be available under ./rpfm

Uses NConvert and a webp plugin from XnConvert to convert images and strip metadeta.

A saner person would probably have used like mongoose or an ORM instead of stapling everything together...

## To Do
- Sort Items by level
- WH3 Oxyotl and Mazdamundi have quest item ancillaries that still exist in skill tree. Check what to do when immortal empires releases.
- Fix right arrow meta tag, not always sorted correctly.
- Add more WH2 Mods
- Prune more props not used in frontend to save file size
- (Done?)Fix WH3 Faction/Lords/Heroes
- (Done?)Look through wh3 tables for new properties to prune/handle

## Possible Expansions
- Hunt down what table defines the level that quest items are unlocked
- See how TW3 spreading works/should be displayed

## How To Use
- Ensure an updated version of rpfm exists in ./rpfm
- Check absolute file paths in ./bins/copySource.bat for copying game/mod files from their install locations
- Make sure all mods are downloaded (might have to check for new loc files/tables occasionally)
- With rpfm (ui) rename the sfo loc table *SFO_effects__.loc to #SFO_effects__.loc because rpfm cant handle the * -_-
- npm run fullBuildProd
- Extracted character skill trees and images will be in the ./output folder as parsed json and webp's

## Can probably prune
- glade_lord_fem ?

## Image Extraction
Extracted images are mostly useful from mods where everything is in one packfile. For vanilla using rpfm to load all CA packfiles will get everything.

Steps for getting all vanilla stuff:
- In rpfm select warhammer2 or warhammer 3 (3 seems to have everything from 2 i should need?)
- load all ca packfiles
- extract the following folders
- skilltree related:
- ui/battle ui/ability_icons/
- ui/campaign ui/effect_bundles/
- ui/campaign ui/skills/
- ui/skins/default/icon_stat_*
- flags/characters:
- ui/flags
- ui/portraits/portholes

WH3 also needs
- ui/skins/default/modifier_icon_*
- ui/battle ui/ability_icons/resistance_* (put with the skins/default)
- ui/campaign ui/skills/item_arcane_item (from WH2, missing from 3)

WH2 has a lot of placeholder ui/skins/default that get hardcode fixed. So copy over imgs in that folder from WH3.

XnConvert webp settings for different conversions:
- skilltree related: quality 90
- flags: lossless
- characters quality 90

Warhammer 3 character portholes arent circularized like wh2/1, can use imagemagick to automate cropping/circularizing them. Note the mask is strangely sized, for whatever reason thats what results in a 164x164 output. The mask also loses inner transparency for black, which then gets replaced, so watch for image artifacts.

magick -size 165x166 xc:Transparent -fill White -draw 'circle 83 83 83 1' -alpha Copy mask.png

$files = Get-ChildItem ".\example\"
foreach ($f in $files){
magick .\example\${f} -gravity Center mask.png -compose CopyOpacity -composite -trim -transparent Black .\out\${f}
}


## Adding a mod
- Create new extract lists such as ./extractLists/sfo2.js
- Use rpfm to check loc table names and map them to their vanilla counterparts
- Check if the mod uses any * in table names, rpfm chokes on that character to rename it to something like #
- Add a new workerModFactory to the mods base game worker (worker2/worker3)
- Check for bugs, especially in string replacements.
- Manually extract the following image paths: 
- ui/skins/default/icon_stat_*
- ui/flags
- ui/portraits/portholes
WH3 also needs
- ui/skins/default/modifier_icon_*
- ui/battle ui/ability_icons/resistance_* (put with the skins/default)
- Use the above image conversion settings/scripts appropriately
- Copy extracted data and images over to TotalWarhammerPlanner repo
