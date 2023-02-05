const charList_effectBundles = (charList, effectBundles) => {
  const factionKeys = Object.keys(charList);
  factionKeys.forEach((factionKey) => {
    const factionCharKeys = Object.keys(charList[factionKey]);
    factionCharKeys.forEach((charKey) => {
      const charNodeSet = charList[factionKey][charKey];

      // Just guess based on key names, if mods dont follow vanillas pattern it wont pick them up
      const relatedBundle = effectBundles.find((bundle) => bundle.key.includes(`_lord_trait_${charNodeSet.key}`));

      if (relatedBundle !== undefined) {
        charNodeSet.factionEffects = { ...relatedBundle };
      }
    });
  });

  return charList;
};

export default charList_effectBundles;
