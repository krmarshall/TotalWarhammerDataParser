const techsPrune = [
  'building_level',
  'position_index', // No clue if this is useful
  'mp_available_early',
  'mp_available_late',
  'info_pic',
  'unique_index',
  'is_civil',
  'is_engineering',
  'is_military',

  // WH2
  'military_prestige',
  'naval_prestige',
  'economic_prestige',
  'enlightenment_prestige',
];

const techs_techLoc = (techs, combinedLoc) => {
  const stapledTable = techs.map((tech) => {
    techsPrune.forEach((prune) => delete tech[prune]);

    const longDescription = combinedLoc[`technologies_long_description_${tech.key}`];
    const shortDescription = combinedLoc[`technologies_short_description_${tech.key}`];

    let desc = '';
    if (['', 'nuffink', 'ph'].includes(longDescription?.trim())) {
      desc = shortDescription;
    } else {
      desc = longDescription;
    }

    const name = combinedLoc[`technologies_onscreen_name_${tech.key}`];

    tech.name = name ? name : '';
    tech.description = desc;
    return { ...tech };
  });
  return stapledTable;
};

export default techs_techLoc;
