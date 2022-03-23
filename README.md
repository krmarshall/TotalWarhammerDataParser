# TotalWarhammerDataParser
 
Requires RPFM (or at least the cli) to be available under ./rpfm

## To Do
- Check wh3 phases stapling, think something is wonky?
- Merge and Parse mods
- Look through wh3 tables for new properties to prune/handle

## Possible Expansions
- Hunt down what table defines the level quest items are unlocked

## How To Use
- Ensure an updated version of rpfm exists in ./rpfm
- Check absolute file paths in scripts for copying game/mod files and clearing data before scripts
- Make sure all mods are downloaded
- With rpfm (ui) rename the sfo loc table *SFO_effects__.loc to #SFO_effects__.loc because rpfm cant handle the *. -_-
- npm run fullBuild
- Extracted character skill trees will be in the ./output folder as parsed json.
