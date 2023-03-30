import fse from 'fs-extra';
import log from '../log.js';
import { cultureMap } from '../lists/cultureMap.js';
import vanillaCharList3 from '../lists/vanillaCharList.js';
import cleanKeyName from './cleanKeyName.js';

const output_characterLists = (folder, cultures, characterSkillNodeSets, combinedLoc, pruneVanilla, customPruneList = vanillaCharList3) => {
  // Properly assigned names for legendary lords seem to be done through the name table and scripting
  // so without digging into parsing scripts this gets most heroes and some lords names pretty well.
  const characterList = {};
  const returnList = {};
  cultures.forEach((culture) => {
    const cultureName = cultureMap[culture.key];
    characterList[cultureName] = { lords: {}, heroes: {} };
    returnList[`${cultureName}_lords`] = {};
    returnList[`${cultureName}_heroes`] = {};

    culture.lordNodeSets.forEach((lord) => {
      const relatedLord = characterSkillNodeSets.find((nodeSet) => {
        return nodeSet.key === lord;
      });
      if (relatedLord === undefined) {
        log(`Cant find key for ${lord}`, 'yellow');
      } else {
        const lordKey = cleanKeyName(relatedLord.key);
        if (pruneVanilla && customPruneList[lordKey] !== undefined) {
          // Dont add to char list
        } else {
          const lordName = combinedLoc[`agent_subtypes_onscreen_name_override_${relatedLord.agent_subtype_key}`];

          if (lordName === undefined) {
            characterList[cultureName].lords[lordKey] = { name: 'undefined' };
            returnList[`${cultureName}_lords`][lordKey] = { fullKey: relatedLord.key };
          } else {
            characterList[cultureName].lords[lordKey] = { name: lordName };
            returnList[`${cultureName}_lords`][lordKey] = { fullKey: relatedLord.key };
          }
        }
      }
    });

    culture.heroNodeSets.forEach((hero) => {
      const relatedHero = characterSkillNodeSets.find((nodeSet) => {
        return nodeSet.key === hero;
      });
      if (relatedHero === undefined) {
        log(`Cant find key for ${hero}`, 'yellow');
      } else {
        const heroKey = cleanKeyName(relatedHero.key);
        if (pruneVanilla && customPruneList[heroKey] !== undefined) {
          // Dont add to char list
        } else {
          const heroName = combinedLoc[`agent_subtypes_onscreen_name_override_${relatedHero.agent_subtype_key}`];

          if (heroName === undefined) {
            characterList[cultureName].heroes[heroKey] = { name: 'undefined' };
            returnList[`${cultureName}_heroes`][heroKey] = { fullKey: relatedHero.key };
          } else {
            characterList[cultureName].heroes[heroKey] = { name: heroName };
            returnList[`${cultureName}_heroes`][heroKey] = { fullKey: relatedHero.key };
          }
        }
      }
    });
  });

  fse.outputJsonSync(`./test/${folder}/characterList.json`, characterList, { spaces: 2 });

  return returnList;
};

export default output_characterLists;
