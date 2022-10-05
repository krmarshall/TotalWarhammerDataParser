const unitSpecialAbilities_projectileBombardments = (unitSpecialAbilities, projectileBombardments) => {
  const stapledTable = unitSpecialAbilities.map((ability) => {
    if (ability.bombardment) {
      const relatedBombardment = projectileBombardments.find((bombardment) => bombardment.bombardment_key === ability.bombardment);
      if (relatedBombardment !== undefined) {
        ability.bombardment = relatedBombardment;
      }
    } else {
      delete ability.bombardment;
    }
    return { ...ability };
  });
  return stapledTable;
};

export default unitSpecialAbilities_projectileBombardments;
