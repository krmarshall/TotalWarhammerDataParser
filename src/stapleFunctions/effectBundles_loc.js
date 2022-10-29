const pruneList = ['bundle_target', 'priority', 'is_global_effect', 'show_in_3d_space', 'owner_only'];

const effectBundles_loc = (effectBundles, combinedLoc) => {
  const stapledTable = effectBundles.map((bundle) => {
    pruneList.forEach((prune) => delete bundle[prune]);

    const title = combinedLoc[`effect_bundles_localised_title_${bundle.key}`];
    title !== undefined ? (bundle.title = title) : (bundle.title = bundle.localised_title);
    delete bundle.localised_title;

    const desc = combinedLoc[`effect_bundles_localised_description_${bundle.key}`];
    desc !== undefined ? (bundle.description = desc) : (bundle.description = bundle.localised_description);
    delete bundle.localised_description;

    return { ...bundle };
  });
  return stapledTable;
};

export default effectBundles_loc;
