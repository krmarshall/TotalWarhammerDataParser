import { Table } from '../generateTables';
import { GlobalDataInterface, RefKey, TableRecord } from '../interfaces/GlobalDataInterface';
import { TechNodeInterface, TechSetInterface } from '../interfaces/TechInterface';
import log from '../utils/log';
import collateTechNodes from './collateTechNodes';
import processTechNode from './processTechNode';

const processTechNodeSet = (
  folder: string,
  globalData: GlobalDataInterface,
  techNodeSet: TableRecord,
  tables: { [key in RefKey]?: Table }
) => {
  const techSet: TechSetInterface = {
    key: techNodeSet.key,
    faction_key: techNodeSet.faction_key,
    culture: techNodeSet.culture,
    tree: [],
    node_links: [],
  };

  const processedNodes: Array<TechNodeInterface> = [];
  techNodeSet.foreignRefs?.technology_nodes?.forEach((techNode) => {
    const tempNode = processTechNode(folder, globalData, techNode);
    if (tempNode !== undefined) processedNodes.push(tempNode);
  });

  const { tree, uiGroups } = collateTechNodes(folder, globalData, processedNodes);
  techSet.tree = tree;

  Object.entries(uiGroups).forEach((uiGroup) => {
    const uiGroupKey = uiGroup[0];
    const uiGroupNodes = uiGroup[1];
    const uiGroupRecord = tables.technology_ui_groups?.findRecordByKey('key', uiGroupKey);
    if (uiGroupRecord === undefined) {
      log(`Missing ui group: ${uiGroupKey}`, 'red');
      return;
    }

    const nodeJunc = uiGroupRecord.foreignRefs?.technology_ui_groups_to_technology_nodes_junctions?.[0] as TableRecord;
    const botRightNode = tables.technology_nodes?.findRecordByKey('key', nodeJunc.bottom_right_node);
    const topLeftNode = tables.technology_nodes?.findRecordByKey('key', nodeJunc.top_left_node);
    // const optTopRightNode = tables.technology_nodes?.findRecordByKey('key', nodeJunc.optional_top_right_node);
    // const optBotLeftNode = tables.technology_nodes?.findRecordByKey('key', nodeJunc.optional_bottom_left_node);

    if (botRightNode === undefined || topLeftNode === undefined) {
      return;
    }

    uiGroupNodes.forEach((techNode) => {
      techNode.ui_group_colour = uiGroupRecord.colour_hex;
    });
  });
};

export default processTechNodeSet;
