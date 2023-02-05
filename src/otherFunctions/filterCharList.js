const filterCharList = (charList) => {
  const factionKeys = Object.keys(charList);
  factionKeys.forEach((factionKey) => {
    const factionCharKeys = Object.keys(charList[factionKey]);
    factionCharKeys.forEach((charKey) => {
      const charNodeSet = charList[factionKey][charKey];

      if (charNodeSet.skillTree?.length > 6) {
        const filteredIndentTree = charNodeSet.skillTree.filter((skillLine) => skillLine !== null);
        charNodeSet.skillTree = filteredIndentTree;
      }

      const filteredTierTree = charNodeSet.skillTree?.map((skillLine) => skillLine.filter((skill) => skill !== null));
      charNodeSet.skillTree = filteredTierTree;
    });
  });
  return charList;
};

export default filterCharList;
