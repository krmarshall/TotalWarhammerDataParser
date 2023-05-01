import { Table } from '../generateTables';
import { GlobalDataInterface, RefKey, TableRecord } from '../interfaces/GlobalDataInterface';
import { NodeLinkInterface, TechNodeInterface, TechSetInterface } from '../interfaces/TechInterface';
import log from '../utils/log';
import { parseBoolean, parseInteger } from '../utils/parseStringToTypes';
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
  const nodeLinksMap: { [key: string]: Array<TableRecord> } = {};
  techNodeSet.foreignRefs?.technology_nodes?.forEach((techNode) => {
    const tempNode = processTechNode(folder, globalData, techNode);
    if (tempNode !== undefined) {
      processedNodes.push(tempNode);
      techNode.foreignRefs?.technology_node_links?.forEach((nodeLink) => {
        if (tempNode.key === nodeLink.parent_key) {
          if (nodeLinksMap[tempNode.key] === undefined) nodeLinksMap[tempNode.key] = [];
          nodeLinksMap[tempNode.key].push(nodeLink);
        }
      });
    }
  });

  const { tree, uiGroups } = collateTechNodes(processedNodes);
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
    // Indent = y, Tier = x
    const topBound = parseInteger(topLeftNode.indent);
    const bottomBound = parseInteger(botRightNode.indent);
    const leftBound = parseInteger(topLeftNode.tier);
    const rightBound = parseInteger(botRightNode.tier);

    for (let y = topBound; y <= bottomBound; y++) {
      for (let x = leftBound; x <= rightBound; x++) {
        if (techSet.tree[y] === null || techSet.tree[y] === undefined) techSet.tree[y] = [];
        if (techSet.tree[y][x] === null || techSet.tree[y][x] === undefined) techSet.tree[y][x] = { bgFiller: true };
        techSet.tree[y][x].ui_group = uiGroupKey;
        techSet.tree[y][x].ui_group_colour = uiGroupRecord.colour_hex;
        techSet.tree[y][x].ui_group_position = '';

        if (y === topBound) {
          techSet.tree[y][x].ui_group_position += 'top';
        }
        if (y === bottomBound) {
          techSet.tree[y][x].ui_group_position += 'bottom';
        }
        if (x === leftBound) {
          techSet.tree[y][x].ui_group_position += 'left';
        }
        if (x === rightBound) {
          techSet.tree[y][x].ui_group_position += 'right';
        }
      }
    }
  });

  Object.entries(nodeLinksMap).forEach((nodeLinkMap) => {
    const nodeLinkParentKey = nodeLinkMap[0];
    const nodeLinks = nodeLinkMap[1];

    nodeLinks.forEach((nodeLink) => {
      const returnLink: NodeLinkInterface = {
        parent_key: nodeLink.parent_key,
        child_key: nodeLink.child_key,
        parent_link_position: translatePosition(nodeLink.parent_link_position, nodeLink.parent_key),
        child_link_position: translatePosition(nodeLink.child_link_position, nodeLink.child_key),
      };
      if (nodeLink.visible_in_ui !== undefined) returnLink.visible_in_ui = parseBoolean(nodeLink.visible_in_ui);
      techSet.node_links.push(returnLink);
    });
  });
};

export default processTechNodeSet;

const translatePosition = (number: string, parent_key: string) => {
  switch (number) {
    case '0': {
      return 'auto';
    }
    case '1': {
      return 'top';
    }
    case '2': {
      return 'right';
    }
    case '3': {
      return 'bottom';
    }
    case '4': {
      return 'left';
    }
    default: {
      log(`invalid link position for: ${parent_key}`, 'red');
      return 'right';
    }
  }
};
