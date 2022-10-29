const factionStartingGeneralEffects_effectBundles = (factionStartingGeneralEffects, effectBundles) => {
  const bundleMap = {};
  effectBundles.forEach((bundle) => {
    bundleMap[bundle.key] = bundle;
  });

  const stapledTable = factionStartingGeneralEffects.map((general) => {
    const relatedBundle = bundleMap[general.effect_bundle];

    if (relatedBundle !== undefined) {
      general.effect_bundle = { ...relatedBundle };
    }
    return { ...general };
  });
  return stapledTable;
};

export default factionStartingGeneralEffects_effectBundles;
