import { GlobalDataInterface, TableRecord } from '../interfaces/GlobalDataInterface';
import { ProcessedAgentInterface } from '../interfaces/ProcessedTreeInterface';
import cleanNodeSetKey from '../utils/cleanNodeSetKey';
import findImage from '../utils/findImage';
import outputAgent from './outputAgent';
import processEffect from './processEffect';
import processNodeSet from './processNodeSet';
import subcultureMap from '../lists/subcultureMap';
import { CharacterListInterface } from '../interfaces/CharacterListInterface';
import processAncillary from './processAncillary';
import processUnitStats from './processUnitStats';

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
    returnAgent.items = [];
    agent.foreignRefs?.character_ancillary_quest_ui_details.forEach((ancillaryQuest) => {
      returnAgent.items?.push(processAncillary(folder, globalData, ancillaryQuest, ancillaryQuest.rank));
    });
  }

  agent.foreignRefs?.character_skill_node_sets?.forEach((nodeSet, index) => {
    if (index === 1 && agent.key === 'nor_marauder_chieftain') {
      return;
    }
    if (nodeSet.foreignRefs?.character_skill_nodes === undefined || nodeSet.foreignRefs?.character_skill_nodes.length === 0) {
      return;
    }

    const nodeSetKey = cleanNodeSetKey(nodeSet.key);
    if (nodeSet.agent_key === 'general') {
      characterList[subcultureMap[subcultureKey]].lords[nodeSetKey] = { name: agent.onscreen_name_override, portrait: '' };
    } else {
      characterList[subcultureMap[subcultureKey]].heroes[nodeSetKey] = { name: agent.onscreen_name_override, portrait: '' };
    }

    const { skillTree, backgroundSkills, items } = processNodeSet(folder, globalData, nodeSet, subcultureKey, factionKeys);
    const tempAgent = JSON.parse(JSON.stringify(returnAgent));
    tempAgent.key = nodeSetKey;
    tempAgent.skillTree = skillTree;
    tempAgent.backgroundSkills = backgroundSkills;
    if (tempAgent.items === undefined && items.length > 0) {
      tempAgent.items = [];
      tempAgent.items.push(...items);
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
