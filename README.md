# TotalWarhammerDataParser
 
Requires RPFM (or at least the cli) to be available under ./rpfm

A saner person would probably have used like mongoose or an ORM instead of stapling everything together...

## To Do
- See how spreading works?
- (Partially Done?)Fix WH3 Faction/Lords/Heroes
- (Partially Done?)Look through wh3 tables for new properties to prune/handle

## Possible Expansions
- Hunt down what table defines the level that quest items are unlocked

## How To Use
- Ensure an updated version of rpfm exists in ./rpfm
- Check absolute file paths in ./bins/copySource.bat for copying game/mod files
- Make sure all mods are downloaded (might have to check for new loc files/tables occasionally)
- With rpfm (ui) rename the sfo loc table *SFO_effects__.loc to #SFO_effects__.loc because rpfm cant handle the *. -_-
- npm run fullBuild
- Extracted character skill trees will be in the ./output folder as parsed json.
