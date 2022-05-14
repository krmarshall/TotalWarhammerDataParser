import fse from 'fs-extra';

const output_characterLists = (folder, cultures, characterSkillNodeSets) => {
  // Properly assigned names for legendary lords seem to be done through the name table and scripting
  // so without digging into parsing scripts this gets most heroes and some lords names pretty well.
  const agentLocTable = fse.readJsonSync(`./parsed_files/${folder}/text/db/agent_subtypes.json`);
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
        console.log(`Cant find key for ${lord}`);
      } else {
        const lordKey = relatedLord.agent_subtype_key;
        const lordName = agentLocTable.find((agentLoc) => {
          return agentLoc.key === `agent_subtypes_onscreen_name_override_${lordKey}`;
        });

        if (lordName === undefined) {
          characterList[`${cultureName}Lords`][lordKey] = 'undefined';
        } else {
          characterList[`${cultureName}Lords`][lordKey] = lordName.text;
        }
      }
    });

    culture.heroNodeSets.forEach((hero) => {
      const relatedHero = characterSkillNodeSets.find((nodeSet) => {
        return nodeSet.key === hero;
      });
      if (relatedHero === undefined) {
        console.log(`Cant find key for ${hero}`);
      } else {
        const heroKey = relatedHero.agent_subtype_key;
        const heroName = agentLocTable.find((agentLoc) => {
          return agentLoc.key === `agent_subtypes_onscreen_name_override_${heroKey}`;
        });

        if (heroName === undefined) {
          characterList[`${cultureName}Heroes`][heroKey] = 'undefined';
        } else {
          characterList[`${cultureName}Heroes`][heroKey] = heroName.text;
        }
      }
    });
  });

  fse.outputJsonSync(`./test/${folder}/characterList.json`, characterList, { spaces: 2 });
};

export default output_characterLists;
