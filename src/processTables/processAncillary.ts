import { GlobalDataInterface, TableRecord } from '../interfaces/GlobalDataInterface';
import { EffectInterface, ItemInterface } from '../interfaces/ProcessedTreeInterface';
import { parseInteger } from '../utils/parseStringToTypes';
import stringInterpolator from '../utils/stringInterpolator';
import processEffect from './processEffect';

const processAncillary = (
  folder: string,
  globalData: GlobalDataInterface,
  ancillaryJunc: TableRecord,
  unlocked_at_rank: string | undefined
) => {
  const ancillary = ancillaryJunc.localRefs?.ancillaries as TableRecord;
  const ancillaryInfo = ancillary.localRefs?.ancillary_info as TableRecord;
  const returnItem: ItemInterface = {
    key: ancillaryInfo.ancillary,
    onscreen_name: stringInterpolator(ancillary.onscreen_name, globalData.parsedData[folder].text),
    colour_text: stringInterpolator(ancillary.colour_text, globalData.parsedData[folder].text),
    ui_icon: (ancillary.localRefs?.ancillary_types?.ui_icon as string)
      .replace(' ', '_')
      .replace('.png', '')
      .replace(/^ui\/|^UI\/|^Ui\//, ''),
  };

  if (unlocked_at_rank !== undefined && unlocked_at_rank !== '') returnItem.unlocked_at_rank = parseInteger(unlocked_at_rank);

  const effects: Array<EffectInterface> = [];
  // Standard Item Effects
  ancillaryInfo.foreignRefs?.ancillary_to_effects?.forEach((effectJunc) => {
    effects.push(processEffect(folder, globalData, effectJunc));
  });
  // Banner Effects
  ancillary.localRefs?.banners?.localRefs?.effect_bundles?.foreignRefs?.effect_bundles_to_effects_junctions?.forEach((effectJunc) => {
    effects.push(processEffect(folder, globalData, effectJunc));
  });
  effects.sort((a, b) => (a.priority as number) - (b.priority as number)).forEach((effect) => delete effect.priority);
  if (effects.length > 0) returnItem.effects = effects;

  return returnItem;
};

export default processAncillary;
