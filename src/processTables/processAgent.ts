import { GlobalDataInterface, TableRecord } from '../interfaces/GlobalDataInterface';
import { EffectInterface, FactionEffectsInterface, ItemInterface } from '../interfaces/ProcessedTreeInterface';
import { parseBoolean, parseInteger } from '../utils/parseStringToTypes';
import processEffect from './processEffect';

const processAgent = (
  folder: string,
  globalData: GlobalDataInterface,
  agent: TableRecord,
  cultureKey: string,
  subcultureKey: string,
  factionKey: string
) => {
  if (agent.foreignRefs?.character_skill_node_sets === undefined) {
    return;
  }
  // agent.onscreen_name_override; // Useful for non-LL

  // LL Faction Effects
  let factionEffects: FactionEffectsInterface | undefined = undefined;
  if (agent.foreignRefs?.faction_starting_general_effects !== undefined) {
    const { foreignRefs, ...effectBundle } = agent.foreignRefs?.faction_starting_general_effects[0].localRefs
      ?.effect_bundles as TableRecord;
    factionEffects = {
      key: effectBundle.key,
      localised_description: effectBundle.localised_description,
      localised_title: effectBundle.localised_title,
      ui_icon: effectBundle.ui_icon,
      effects: [],
    };
    foreignRefs?.effect_bundles_to_effects_junctions.forEach((effect) => {
      factionEffects?.effects.push(
        processEffect(folder, globalData, effect.localRefs?.effects as TableRecord, effect.value, effect.effect_scope)
      );
    });
  }

  // Quest Ancillaries
  const items: Array<ItemInterface> = [];
  if (agent.foreignRefs?.character_ancillary_quest_ui_details !== undefined) {
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

      items.push({
        key: ancillaryInfo.ancillary as string,
        effects: effects,
        onscreen_name: ancillary.onscreen_name as string,
        colour_text: ancillary.colour_text as string,
        unlocked_at_rank: parseInteger(ancillaryQuest.rank as string),
        instant: parseBoolean(ancillaryQuest.instant as string),
        ui_icon: (ancillary.localRefs?.ancillary_types.ui_icon as string).replace(' ', '_').replace('.png', ''),
      });
    });
  }

  // Skill Node Set
  // To Do
};

export default processAgent;
