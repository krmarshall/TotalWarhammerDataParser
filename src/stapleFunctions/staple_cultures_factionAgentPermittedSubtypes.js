const staple_cultures_factionAgentPermittedSubtypes = (cultures, factionAgentPermittedSubtypes) => {
  const stapledTable = cultures.map((culture) => {
    const relatedAgents = factionAgentPermittedSubtypes.filter((agent) => {
      let intersects = false;
      culture.factions.forEach((faction) => {
        if (agent.faction === faction) {
          intersects = true;
        }
      });
      return intersects;
    });

    if (relatedAgents.length) {
      culture.agents = [];
      relatedAgents.forEach((agent) => {
        if (agent.subtype !== 'default' && !culture.agents.includes(agent.subtype)) {
          culture.agents.push(agent.subtype);
        }
      });
    }

    return { ...culture };
  });
  return stapledTable;
};

export default staple_cultures_factionAgentPermittedSubtypes;
