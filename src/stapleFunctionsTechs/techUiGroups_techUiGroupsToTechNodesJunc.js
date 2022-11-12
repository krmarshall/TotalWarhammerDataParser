const techUiGroups_techUiGroupsToTechNodesJunc = (techUiGroups, techUiGroupsToTechNodesJunc) => {
  const groupNodeMap = {};
  techUiGroupsToTechNodesJunc.forEach((groupNode) => {
    groupNodeMap[groupNode.tech_ui_group] = groupNode;
  });

  const stapledTable = techUiGroups.map((group) => {
    const relatedNode = groupNodeMap[group.key];

    if (relatedNode !== undefined) {
      group.top_left_node = relatedNode.top_left_node;
      group.bottom_right_node = relatedNode.bottom_right_node;
      relatedNode.optional_top_right_node !== '' ? (group.optional_top_right_node = relatedNode.optional_top_right_node) : undefined;
      relatedNode.optional_bottom_left_node !== '' ? (group.optional_bottom_left_node = relatedNode.optional_bottom_left_node) : undefined;
    }
    return { ...group };
  });
  return stapledTable;
};

export default techUiGroups_techUiGroupsToTechNodesJunc;
