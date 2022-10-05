const unitSpecialAbilities_battleVortexes = (unitSpecialAbilities, battleVortexes) => {
  const stapledTable = unitSpecialAbilities.map((ability) => {
    if (ability.vortex) {
      const relatedVortex = battleVortexes.find((vortex) => vortex.vortex_key === ability.vortex);
      if (relatedVortex !== undefined) {
        // Seems like vortices are sometimes used just for vfx with no damage or contact effects (like dwarf flash bomb)
        if (relatedVortex.damage === 0 && relatedVortex.damage_ap === 0 && relatedVortex.contact_effect === undefined) {
          delete ability.vortex;
        } else {
          ability.vortex = relatedVortex;
        }
      }
    } else {
      delete ability.vortex;
    }
    return { ...ability };
  });

  return stapledTable;
};

export default unitSpecialAbilities_battleVortexes;
