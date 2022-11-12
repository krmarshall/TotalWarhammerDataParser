const techNodeSets_techUiGroups = (techNodeSets, techUiGroups) => {
  const stapledTable = techNodeSets.map((nodeSet) => {
    const nodeKeyMap = {};
    nodeSet.tree.forEach((row) => {
      row.forEach((node) => {
        nodeKeyMap[node.key] = { indent: node.indent, tier: node.tier };
      });
    });

    techUiGroups.forEach((uiGroup) => {
      const topLeft = nodeKeyMap[uiGroup.top_left_node];
      const botRight = nodeKeyMap[uiGroup.bottom_right_node];
      if (topLeft !== undefined && botRight !== undefined) {
        // Indent = y, Tier = x
        const topBound = topLeft.indent;
        const bottomBound = botRight.indent;
        const leftBound = topLeft.tier;
        const rightBound = botRight.tier;

        for (let y = topBound; y <= bottomBound; y++) {
          for (let x = leftBound; x <= rightBound; x++) {
            if (nodeSet.tree[y] === null || nodeSet.tree[y] === undefined) {
              nodeSet.tree[y] = [];
            }
            if (nodeSet.tree[y][x] === null || nodeSet.tree[y][x] === undefined) {
              nodeSet.tree[y][x] = { bgFiller: true };
            }
            nodeSet.tree[y][x].ui_group = uiGroup.key;
            nodeSet.tree[y][x].ui_group_colour = uiGroup.colour_hex;
            nodeSet.tree[y][x].ui_group_position = '';
            if (y === topBound) {
              nodeSet.tree[y][x].ui_group_position += 'top';
            }
            if (y === bottomBound) {
              nodeSet.tree[y][x].ui_group_position += 'bottom';
            }
            if (x === leftBound) {
              nodeSet.tree[y][x].ui_group_position += 'left';
            }
            if (x === rightBound) {
              nodeSet.tree[y][x].ui_group_position += 'right';
            }
          }
        }
      }
    });
    return { ...nodeSet };
  });
  return stapledTable;
};

export default techNodeSets_techUiGroups;
