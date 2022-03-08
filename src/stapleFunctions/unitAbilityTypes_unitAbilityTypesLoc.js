const unitAbilityTypes_unitAbilityTypesLoc = (unitAbilityTypes, unitAbilityTypesLoc) => {
  const stapledTable = unitAbilityTypes.map((type) => {
    const relatedLoc = unitAbilityTypesLoc.find((loc) => {
      return loc.key === `unit_ability_types_onscreen_name_${type.key}`;
    });
    if (relatedLoc !== undefined) {
      type.description = relatedLoc.text;
    }
    delete type.show_cursor_trail;
    return { ...type };
  });
  return stapledTable;
};

export default unitAbilityTypes_unitAbilityTypesLoc;
