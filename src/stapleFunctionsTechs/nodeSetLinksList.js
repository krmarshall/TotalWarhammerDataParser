import log from '../log.js';

const translatePosition = (number, parent_key) => {
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

const nodeSetLinksList = (techNodes, techNodeLinks) => {
  const linksMap = {};
  techNodeLinks.forEach((link) => {
    if (linksMap[link.parent_key] === undefined) {
      linksMap[link.parent_key] = [];
    }
    linksMap[link.parent_key].push(link);
  });

  const nodeSetMap = {};

  techNodes.forEach((node) => {
    if (nodeSetMap[node.technology_node_set] === undefined) {
      nodeSetMap[node.technology_node_set] = [];
    }

    const relatedLinks = linksMap[node.key];

    if (relatedLinks !== undefined) {
      relatedLinks.forEach((link) => {
        const tempObj = {
          parent_key: link.parent_key,
          child_key: link.child_key,
          parent_link_position: translatePosition(link.parent_link_position, link.parent_key),
          child_link_position: translatePosition(link.child_link_position, link.parent_key),
        };
        if (link.visible_in_ui !== undefined) {
          tempObj.visible = JSON.parse(link.visible_in_ui);
        }
        nodeSetMap[node.technology_node_set].push(tempObj);
      });
    }
  });
  return nodeSetMap;
};

export default nodeSetLinksList;
