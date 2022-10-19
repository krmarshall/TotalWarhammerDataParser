import fse from 'fs-extra';
import log from '../log.js';

const output_characterLists = (folder, cultures, characterSkillNodeSets, combinedLoc) => {
  // Properly assigned names for legendary lords seem to be done through the name table and scripting
  // so without digging into parsing scripts this gets most heroes and some lords names pretty well.
  const characterList = {};
  cultures.forEach((culture) => {
    const cultureName = culture.name.replace(/\s/, '');
    characterList[`${cultureName}Lords`] = {};
    characterList[`${cultureName}Heroes`] = {};

    culture.lordNodeSets.forEach((lord) => {
      const relatedLord = characterSkillNodeSets.find((nodeSet) => {
        return nodeSet.key === lord;
      });
      if (relatedLord === undefined) {
        log(`Cant find key for ${lord}`, 'yellow');
      } else {
        const lordKey = relatedLord.agent_subtype_key;
        const lordName = combinedLoc[`agent_subtypes_onscreen_name_override_${lordKey}`];

        if (lordName === undefined) {
          characterList[`${cultureName}Lords`][lordKey] = 'undefined';
        } else {
          characterList[`${cultureName}Lords`][lordKey] = lordName;
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
        const heroKey = relatedHero.agent_subtype_key;
        const heroName = combinedLoc[`agent_subtypes_onscreen_name_override_${heroKey}`];

        if (heroName === undefined) {
          characterList[`${cultureName}Heroes`][heroKey] = 'undefined';
        } else {
          characterList[`${cultureName}Heroes`][heroKey] = heroName;
        }
      }
    });
  });

  fse.outputJsonSync(`./test/${folder}/characterList.json`, characterList, { spaces: 2 });
};

export default output_characterLists;
