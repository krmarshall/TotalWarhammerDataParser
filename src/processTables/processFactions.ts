import { Table } from '../generateTables';
import { CharacterListInterface } from '../interfaces/CharacterListInterface';
import { GlobalDataInterface, RefKey, TableRecord } from '../interfaces/GlobalDataInterface';
import { addAgents, ignoreAgents, ignoreCultures, ignoreFactions, ignoreSubcultures } from '../lists/processFactionsLists';
import { techNodeSetsPrune2, techNodeSetsPrune3, vanilla3TechNodeSets } from '../lists/processFactionsTechLists';
import subcultureMap from '../lists/subcultureMap';
import vanillaCharacters from '../lists/vanillaCharacters';
import cleanNodeSetKey from '../utils/cleanNodeSetKey';
import processAgent from './processAgent';
import fse from 'fs-extra';
import processTechNodeSet from './processTechNodeSet';

const processFactions = (folder: string, globalData: GlobalDataInterface, tables: { [key in RefKey]?: Table }, pruneVanilla: boolean) => {
  const game = folder.includes('2') ? '2' : '3';

  const completedTechNodeSets: { [key: string]: boolean } = {};
  const agentMap: { [key: string]: { subcultures: Set<string>; factions: Set<string> } } = {};
  const characterList: CharacterListInterface = {};
  Object.values(subcultureMap).forEach((subculture) => (characterList[subculture] = { lords: {}, heroes: {} }));

  addAgents.forEach((addAgent) => {
    if (addAgent.game !== game) {
      return;
    }
    const agent = tables.agent_subtypes?.findRecordByKey('key', addAgent.agent);
    if (agent === undefined) {
      return;
    }
    const nodeSetKey = agent.foreignRefs?.character_skill_node_sets?.[0]?.key as string;
    if (nodeSetKey === undefined) {
      return;
    }
    if (
      ignoreAgents.some(
        (ignoreAgent) =>
          ignoreAgent.agent === addAgent.agent &&
          (ignoreAgent.game === 'ALL' || game === ignoreAgent.game) &&
          (ignoreAgent.subculture === undefined || ignoreAgent.subculture === addAgent.subculture)
      )
    ) {
      return;
    }
    const cleanKey = cleanNodeSetKey(nodeSetKey as string);
    if (pruneVanilla && vanillaCharacters[cleanKey] !== undefined) {
      return;
    }

    if (agentMap[addAgent.agent] === undefined) agentMap[addAgent.agent] = { subcultures: new Set(), factions: new Set() };
    agentMap[addAgent.agent].subcultures.add(addAgent.subculture);
  });

  tables.cultures?.records.forEach((culture) => {
    if (ignoreCultures.includes(culture.key)) {
      return;
    }
    culture.foreignRefs?.technology_node_sets?.forEach((techNodeSet) => {
      handleTechs(game, pruneVanilla, techNodeSet, folder, globalData, tables, completedTechNodeSets);
    });
    culture.foreignRefs?.cultures_subcultures?.forEach((subculture) => {
      subculture.foreignRefs?.technology_node_sets?.forEach((techNodeSet) => {
        handleTechs(game, pruneVanilla, techNodeSet, folder, globalData, tables, completedTechNodeSets);
      });

      if (
        ignoreSubcultures.some(
          (ignoreCult) => ignoreCult.subculture === subculture.subculture && (folder === ignoreCult.game || ignoreCult.game === 'ALL')
        )
      ) {
        return;
      }
      subculture.foreignRefs?.factions?.forEach((faction) => {
        faction.foreignRefs?.technology_node_sets?.forEach((techNodeSet) => {
          handleTechs(game, pruneVanilla, techNodeSet, folder, globalData, tables, completedTechNodeSets);
        });
        if (
          faction.is_quest_faction === 'true' ||
          faction.is_rebel === 'true' ||
          faction.key.includes('_separatists') ||
          faction.key.includes('_invasion') ||
          faction.key.includes('_prologue') ||
          ignoreFactions.includes(faction.key)
        ) {
          return;
        }
        faction.foreignRefs?.faction_agent_permitted_subtypes?.forEach((factionAgent) => {
          if (factionAgent.agent === 'colonel' || factionAgent.agent === 'minister') {
            return;
          }
          if (
            ignoreAgents.some(
              (ignoreAgent) =>
                ignoreAgent.agent === factionAgent.subtype &&
                (ignoreAgent.game === 'ALL' || game === ignoreAgent.game) &&
                (ignoreAgent.subculture === undefined || ignoreAgent.subculture === subculture.subculture)
            )
          ) {
            return;
          }
          const nodeSetKey = factionAgent?.localRefs?.agent_subtypes?.foreignRefs?.character_skill_node_sets?.[0]?.key;
          if (nodeSetKey === undefined) {
            return;
          }
          const cleanKey = cleanNodeSetKey(nodeSetKey as string);
          if (pruneVanilla && vanillaCharacters[cleanKey] !== undefined) {
            return;
          }

          if (agentMap[factionAgent.subtype] === undefined) {
            agentMap[factionAgent.subtype] = { subcultures: new Set(), factions: new Set() };
          }
          agentMap[factionAgent.subtype].subcultures.add(subculture.subculture);
          agentMap[factionAgent.subtype].factions.add(faction.key);
        });
      });
    });
  });

  Object.keys(agentMap).forEach((agentKey) => {
    const agent = agentMap[agentKey];
    agent.subcultures.forEach((subculture) => {
      const agentRecord = tables.agent_subtypes?.findRecordByKey('key', agentKey);
      if (agentRecord !== undefined) {
        processAgent(folder, globalData, agentRecord, subculture, agent.factions, characterList);
      }
    });
  });

  fse.outputJSONSync(`debug/${folder}/characterList.json`, characterList, { spaces: 2 });
};

export default processFactions;

const handleTechs = (
  game: string,
  pruneVanilla: boolean,
  techNodeSet: TableRecord,
  folder: string,
  globalData: GlobalDataInterface,
  tables: { [key in RefKey]?: Table },
  completedTechNodeSets: { [key: string]: boolean }
) => {
  if (completedTechNodeSets[techNodeSet.key] !== undefined) {
    return;
  }
  const gameTechNodePrune = game === '2' ? techNodeSetsPrune2 : techNodeSetsPrune3;
  if (gameTechNodePrune.includes(techNodeSet.key)) {
    return;
  }
  if (pruneVanilla && vanilla3TechNodeSets.includes(techNodeSet.key)) {
    return;
  }
  completedTechNodeSets[techNodeSet.key] = true;
  processTechNodeSet(folder, globalData, techNodeSet, tables);
};
