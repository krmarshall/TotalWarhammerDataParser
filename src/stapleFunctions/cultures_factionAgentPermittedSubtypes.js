import addFactionAgents from '../pruneLists/addFactionAgents.js';

const cultures_factionAgentPermittedSubtypes = (cultures, factionAgentPermittedSubtypes) => {
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

    const addAgents = addFactionAgents.filter((agent) => {
      return agent.faction === culture.key;
    });
    addAgents.forEach((agent) => {
      culture.agents.push(agent.agent);
    });
    return { ...culture };
  });
  return stapledTable;
};

export default cultures_factionAgentPermittedSubtypes;
