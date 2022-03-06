import subculturesPrune from '../pruneLists/subculturesPrune.js';

const cultures_factions = (cultures, factions) => {
  const stapledTable = cultures.map((culture) => {
    const relatedFactions = factions.filter((faction) => {
      return faction.subculture === culture.subculture;
    });
    if (relatedFactions.length) {
      if (culture.factions === undefined) {
        culture.factions = [];
      }
      relatedFactions.forEach((faction) => {
        // MP available seems convenient check but missing some lords :-/
        // Missing lords/heroes are probably because of the subculture prune here
        if (!culture.factions.includes(faction.key) && !subculturesPrune.includes(faction.key) /*&& faction.mp_available === 'true'*/) {
          culture.factions.push(faction.key);
        }
      });
    }

    return { ...culture };
  });
  return stapledTable;
};

export default cultures_factions;
