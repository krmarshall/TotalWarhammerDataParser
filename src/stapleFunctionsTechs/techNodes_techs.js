const techNodesPrune = ['campaign_key', 'food_cost', 'resource_cost'];

const techNodes_techs = (techNodes, techs) => {
  const techsMap = {};
  techs.forEach((tech) => {
    techsMap[tech.key] = tech;
  });

  const stapledTable = techNodes.map((node) => {
    techNodesPrune.forEach((prune) => delete node[prune]);

    const relatedTech = techsMap[node.technology_key];
    if (relatedTech !== undefined) {
      node.technology = JSON.parse(JSON.stringify(relatedTech));
      delete node.technology_key;
      node.faction_key === '' ? delete node.faction_key : undefined;
      node.optional_ui_group === '' ? delete node.optional_ui_group : undefined;
      node.tier = parseInt(node.tier);
      // For sigmar knows what reason indents start at -2, realign them to 0 for easier array usage
      node.indent = parseInt(node.indent) + 2;
      node.research_points_required = parseInt(node.research_points_required);
      node.cost_per_round = parseInt(node.cost_per_round);
      // WH2 doesnt have required parents number
      node.required_parents !== undefined ? (node.required_parents = parseInt(node.required_parents)) : undefined;
      ['0', ''].includes(node.pixel_offset_x) ? delete node.pixel_offset_x : parseInt(node.pixel_offset_x);
      ['0', ''].includes(node.pixel_offset_y) ? delete node.pixel_offset_y : parseInt(node.pixel_offset_y);
    }
    return { ...node };
  });
  return stapledTable;
};

export default techNodes_techs;
