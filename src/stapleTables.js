import fse from 'fs-extra';

const stapleVanillaTables = () => {
  const ancillaries = JSON.parse(fse.readFileSync('./parsed_files/db/ancillaries_tables.json', 'utf-8'));
  const ancillaryTypes = JSON.parse(fse.readFileSync('./parsed_files/db/ancillary_types_tables.json', 'utf-8'));
  const ancillaries_AncillaryTypes = staple_Ancillaries_AncillaryTypes(ancillaries, ancillaryTypes);
  
  fse.outputFileSync('./test/test.json', JSON.stringify(ancillaries_AncillaryTypes, null, 2));
};

const staple_Ancillaries_AncillaryTypes = (ancillaries, ancillaryTypes) => {
  const ancillariesPrune = ["applies_to", "transferrable", "unique_to_world", "unique_to_faction", "precedence", "start_date", "end_date", "avatar_skill", "avatar_special_ability", "legendary_item", "mp_exclusive", "is_wife_ancillary", "category", "min_starting_age", "max_starting_age", "min_expiry_age", "max_expiry_age", "immortal", "provided_bodyguard_unit", "provided_banner", "uniqueness_score", "turns_before_swap_allowed", "subcategory", "randomly_dropped", "can_be_stolen", "can_be_destroyed"];
  const stapledTable = ancillaries.map((ancillary) => {
    ancillariesPrune.forEach((prune) => {
      delete ancillary[prune];
    });
    const relatedAncillaryType = ancillaryTypes.find((ancillaryType) => {
      return ancillaryType.type === ancillary.type;
    })
    ancillary.ui_icon = relatedAncillaryType.ui_icon;
    return ancillary;
  });
  return stapledTable;
};

export { stapleVanillaTables };
