# TotalWarhammerDataParser
 
Requires RPFM (or at least the cli) to be available under ./rpfm

Uses NConvert and a webp plugin from XnConvert to convert images and strip metadeta.

A saner person would probably have used like mongoose or an ORM instead of stapling everything together...

## To Do
- Missing Boris Todbringer D-:
- wh_dlc03_bst_beastlord pops up under other factions in WH3 output
- Add more WH2 Mods
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
- Vampire Coast lords with tech_?
- Black ark lords?
- red_crested_skink_chief_legendary legendary doesnt matter?
- tlaqua lizardmen heroes?
- glade_lord_fem ?
