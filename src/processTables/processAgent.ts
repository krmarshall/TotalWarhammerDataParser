import { GlobalDataInterface, TableRecord } from '../interfaces/GlobalDataInterface';
import { EffectInterface, ProcessedAgentInterface } from '../interfaces/ProcessedTreeInterface';
import cleanNodeSetKey from '../utils/cleanNodeSetKey';
import findImage from '../utils/findImage';
import log from '../utils/log';
import { parseBoolean, parseInteger } from '../utils/parseStringToTypes';
import processEffect from './processEffect';
import processNodeSet from './processNodeSet';

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
  // agent.onscreen_name_override; // Useful for non-LL

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
    foreignRefs?.effect_bundles_to_effects_junctions.forEach((effect) => {
      returnAgent.factionEffects?.effects.push(
        processEffect(folder, globalData, effect.localRefs?.effects as TableRecord, effect.value, effect.effect_scope)
      );
    });
  }

  // Quest Ancillaries WH3
  if (agent.foreignRefs?.character_ancillary_quest_ui_details !== undefined) {
    returnAgent.items = [];
    agent.foreignRefs?.character_ancillary_quest_ui_details.forEach((ancillaryQuest) => {
      const ancillary = ancillaryQuest.localRefs?.ancillaries as TableRecord;
      const ancillaryInfo = ancillary.localRefs?.ancillary_info as TableRecord;
      const effects: Array<EffectInterface> = [];
      // Standard Item Effects
      ancillaryInfo.foreignRefs?.ancillary_to_effects?.forEach((effect) => {
        effects.push(processEffect(folder, globalData, effect.localRefs?.effects as TableRecord, effect.value, effect.effect_scope));
      });
      // Banner Effects
      ancillary.localRefs?.banners?.localRefs?.effect_bundles.foreignRefs?.effect_bundles_to_effects_junctions.forEach((effectJunc) => {
        effects.push(processEffect(folder, globalData, effectJunc.localRefs?.effects as TableRecord, effectJunc.value, effectJunc.scope));
      });

      returnAgent.items?.push({
        key: ancillaryInfo.ancillary,
        effects: effects,
        onscreen_name: ancillary.onscreen_name,
        colour_text: ancillary.colour_text,
        unlocked_at_rank: parseInteger(ancillaryQuest.rank),
        instant: parseBoolean(ancillaryQuest.instant),
        ui_icon: (ancillary.localRefs?.ancillary_types.ui_icon as string).replace(' ', '_').replace('.png', ''),
      });
    });
  }

  // Skill Node Set
  if (agent.foreignRefs?.character_skill_node_sets.length > 1) {
    log(`Agent has multiple skill node sets: ${agent.key}`, 'red');
  }
  const { skillTree, backgroundSkills } = processNodeSet(
    folder,
    globalData,
    agent.foreignRefs?.character_skill_node_sets[0],
    subcultureKey,
    factionKeys
  );
  returnAgent.skillTree = skillTree;
  returnAgent.backgroundSkills = backgroundSkills;
};

export default processAgent;

const findFactionEffectImage = (folder: string, globalData: GlobalDataInterface, iconArg: string) => {
  const icon = iconArg.replace('.png', '').trim();
  const searchArray = [`campaign_ui/effect_bundles/${icon}`, `campaign_ui/effect_bundles/${icon.toLowerCase()}`];

  return findImage(folder, globalData, searchArray, icon);
};
