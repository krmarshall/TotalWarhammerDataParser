import { GlobalDataInterface, TableRecord } from '../interfaces/GlobalDataInterface';
import { EffectInterface } from '../interfaces/ProcessedTreeInterface';
import { TechNodeInterface } from '../interfaces/TechInterface';
import findImage from '../utils/findImage';
import { parseInteger } from '../utils/parseStringToTypes';
import processAncillary from './processAncillary';
import processEffect from './processEffect';

const processTechNode = (folder: string, globalData: GlobalDataInterface, techNode: TableRecord) => {
  const tech = techNode.localRefs?.technologies;
  if (tech === undefined) {
    return;
  }

  const effects: Array<EffectInterface> = [];
  tech.foreignRefs?.technology_effects_junction?.forEach((effectJunc) => {
    effects.push(processEffect(folder, globalData, effectJunc));
  });

  const returnTechNode: TechNodeInterface = {
    key: techNode.key,
    tier: parseInteger(techNode.tier),
    indent: parseInteger(techNode.indent) + 2, // Indents start at -2 for some reason
    research_points_required: parseInteger(techNode.research_points_required),
    technology: {
      key: tech.key,
      icon_name: findTechImage(folder, globalData, tech.icon_name),
      onscreen_name: tech.onscreen_name,
      short_description: tech.short_description,
      effects: effects,
    },
  };

  if (techNode.cost_per_round !== '0') returnTechNode.cost_per_round = parseInteger(techNode.cost_per_round);
  if (techNode.required_parents !== '0') returnTechNode.required_parents = parseInteger(techNode.required_parents);
  const uiGroup = techNode.localRefs?.technology_ui_groups?.key;
  if (uiGroup !== undefined) returnTechNode.ui_group = uiGroup;

  const required_buildings: Array<string> = [];
  tech.foreignRefs?.technology_required_building_levels_junctions?.forEach((buildingJunc) => {
    const buildingName = buildingJunc.localRefs?.building_levels?.foreignRefs?.building_culture_variants?.[0]?.name;
    if (buildingName !== undefined) {
      required_buildings.push(buildingName);
    }
  });
  if (required_buildings.length > 0) returnTechNode.technology.required_buildings = required_buildings;

  techNode.foreignRefs?.technology_nodes_to_ancillaries_junctions?.forEach((ancillaryJunc) => {
    if (returnTechNode.items === undefined) returnTechNode.items = [];
    returnTechNode.items.push(processAncillary(folder, globalData, ancillaryJunc, undefined));
  });

  return returnTechNode;
};

export default processTechNode;

const findTechImage = (folder: string, globalData: GlobalDataInterface, iconArg: string) => {
  const icon = iconArg.replace('.png', '').trim();
  const searchArray = [`campaign_ui/technologies/${icon}`, `campaign_ui/technologies/${icon.toLowerCase()}`];

  return findImage(folder, globalData, searchArray, icon);
};
