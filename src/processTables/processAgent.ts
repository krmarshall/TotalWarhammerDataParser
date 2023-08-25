import { GlobalDataInterface, TableRecord } from '../interfaces/GlobalDataInterface';
import { ItemInterface, ProcessedAgentInterface } from '../interfaces/ProcessedTreeInterface';
import cleanNodeSetKey from '../utils/cleanNodeSetKey';
import findImage from '../utils/findImage';
import outputAgent from './outputAgent';
import processEffect from './processEffect';
import processNodeSet from './processNodeSet';
import subcultureMap from '../lists/subcultureMap';
import { CharacterListInterface } from '../interfaces/CharacterListInterface';
import processAncillary from './processAncillary';
import processUnitStats from './processUnitStats';
import addCharacterListReference from '../utils/addCharacterListReference';

const processAgent = (
  folder: string,
  globalData: GlobalDataInterface,
  agent: TableRecord,
  subcultureKey: string,
  factionKeys: Set<string>,
  characterList: CharacterListInterface
) => {
  const returnAgent: ProcessedAgentInterface = {
    key: '',
    skillTree: [],
    unitStats: processUnitStats(folder, globalData, agent.localRefs?.main_units as TableRecord),
  };
  const unfilteredItems: Array<ItemInterface> = [];

  // LL Faction Effects WH3
  if (agent.foreignRefs?.faction_starting_general_effects !== undefined) {
    const { foreignRefs, ...effectBundle } = agent.foreignRefs?.faction_starting_general_effects[0].localRefs
      ?.effect_bundles as TableRecord;
    returnAgent.factionEffects = {
      key: effectBundle.key,
      localised_description: effectBundle.localised_description,
      localised_title: effectBundle.localised_title,
      ui_icon: findFactionEffectImage(folder, globalData, effectBundle.ui_icon),
      effects: [],
    };
    foreignRefs?.effect_bundles_to_effects_junctions?.forEach((effectJunc) => {
      returnAgent.factionEffects?.effects.push(processEffect(folder, globalData, effectJunc as TableRecord));
    });
    returnAgent.factionEffects.effects
      .sort((a, b) => (a.priority as number) - (b.priority as number))
      .forEach((effect) => delete effect.priority);
  }

  // Quest Ancillaries WH3
  if (agent.foreignRefs?.character_ancillary_quest_ui_details !== undefined) {
    agent.foreignRefs?.character_ancillary_quest_ui_details.forEach((ancillaryQuest) => {
      unfilteredItems.push(processAncillary(folder, globalData, ancillaryQuest, ancillaryQuest.rank));
    });
  }

  agent.foreignRefs?.character_skill_node_sets?.forEach((nodeSet, index) => {
    if (index === 1 && agent.key === 'nor_marauder_chieftain') {
      return;
    }
    if (nodeSet.foreignRefs?.character_skill_nodes === undefined || nodeSet.foreignRefs?.character_skill_nodes.length === 0) {
      return;
    }

    addCharacterListReference(folder, globalData, agent, nodeSet, subcultureKey, characterList);

    const { skillTree, backgroundSkills, items, altFactionNodeSets } = processNodeSet(
      folder,
      globalData,
      nodeSet,
      subcultureKey,
      factionKeys
    );
    const tempAgent = JSON.parse(JSON.stringify(returnAgent));
    const nodeSetKey = cleanNodeSetKey(nodeSet.key);
    tempAgent.key = nodeSetKey;
    tempAgent.skillTree = skillTree;
    unfilteredItems.push(...items);
    if (unfilteredItems.length > 0) {
      tempAgent.items = [];
      const itemKeys = new Set<string>();
      unfilteredItems.forEach((item) => {
        if (!itemKeys.has(item.key)) {
          tempAgent.items?.push(item);
          itemKeys.add(item.key);
        }
      });
    }
    tempAgent.backgroundSkills = backgroundSkills;
    if (altFactionNodeSets !== undefined) {
      tempAgent.altFactionNodeSets = altFactionNodeSets;
    }

    outputAgent(tempAgent, folder, subcultureMap[subcultureKey as keyof typeof subcultureMap]);
  });
};

export default processAgent;

const findFactionEffectImage = (folder: string, globalData: GlobalDataInterface, iconArg: string) => {
  const icon = iconArg.replace('.png', '').trim();
  const searchArray = [`campaign_ui/effect_bundles/${icon}`, `campaign_ui/effect_bundles/${icon.toLowerCase()}`];

  return findImage(folder, globalData, searchArray, icon);
};
