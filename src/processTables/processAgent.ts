import { GlobalDataInterface, TableRecord } from '../interfaces/GlobalDataInterface';
import { EffectInterface, ProcessedAgentInterface } from '../interfaces/ProcessedTreeInterface';
import cleanNodeSetKey from '../utils/cleanNodeSetKey';
import findImage from '../utils/findImage';
import log from '../utils/log';
import { parseBoolean, parseInteger } from '../utils/parseStringToTypes';
import outputAgent from './outputAgent';
import processEffect from './processEffect';
import processNodeSet from './processNodeSet';
import subcultureMap from '../lists/subcultureMap';

const processAgent = (
  folder: string,
  globalData: GlobalDataInterface,
  agent: TableRecord,
  subcultureKey: string,
  factionKeys: Set<string>
) => {
  if (agent.foreignRefs?.character_skill_node_sets === undefined) {
    return;
  }
  const returnAgent: ProcessedAgentInterface = { key: cleanNodeSetKey(agent.foreignRefs?.character_skill_node_sets[0].key), skillTree: [] };

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
    returnAgent.factionEffects.effects.sort((a, b) => a.priority - b.priority);
  }

  // Quest Ancillaries WH3
  if (agent.foreignRefs?.character_ancillary_quest_ui_details !== undefined) {
    returnAgent.items = [];
    agent.foreignRefs?.character_ancillary_quest_ui_details.forEach((ancillaryQuest) => {
      const ancillary = ancillaryQuest.localRefs?.ancillaries as TableRecord;
      const ancillaryInfo = ancillary.localRefs?.ancillary_info as TableRecord;
      const effects: Array<EffectInterface> = [];
      // Standard Item Effects
      ancillaryInfo.foreignRefs?.ancillary_to_effects?.forEach((effectJunc) => {
        effects.push(processEffect(folder, globalData, effectJunc));
      });
      // Banner Effects
      ancillary.localRefs?.banners?.localRefs?.effect_bundles?.foreignRefs?.effect_bundles_to_effects_junctions?.forEach((effectJunc) => {
        effects.push(processEffect(folder, globalData, effectJunc));
      });

      returnAgent.items?.push({
        key: ancillaryInfo.ancillary,
        effects: effects.sort((a, b) => a.priority - b.priority),
        onscreen_name: ancillary.onscreen_name,
        colour_text: ancillary.colour_text,
        unlocked_at_rank: parseInteger(ancillaryQuest.rank),
        ui_icon: (ancillary.localRefs?.ancillary_types?.ui_icon as string).replace(' ', '_').replace('.png', ''),
      });
    });
  }

  // Skill Node Set
  if (agent.foreignRefs?.character_skill_node_sets.length > 1 && agent.key !== 'nor_marauder_chieftain') {
    log(`Agent has multiple skill node sets: ${agent.key}`, 'red');
  }
  const { skillTree, backgroundSkills, items } = processNodeSet(
    folder,
    globalData,
    agent.foreignRefs?.character_skill_node_sets[0],
    subcultureKey,
    factionKeys
  );
  returnAgent.skillTree = skillTree;
  returnAgent.backgroundSkills = backgroundSkills;
  if (returnAgent.items === undefined) returnAgent.items = [];
  returnAgent.items.push(...items);

  outputAgent(returnAgent, folder, subcultureMap[subcultureKey as keyof typeof subcultureMap]);
};

export default processAgent;

const findFactionEffectImage = (folder: string, globalData: GlobalDataInterface, iconArg: string) => {
  const icon = iconArg.replace('.png', '').trim();
  const searchArray = [`campaign_ui/effect_bundles/${icon}`, `campaign_ui/effect_bundles/${icon.toLowerCase()}`];

  return findImage(folder, globalData, searchArray, icon);
};
