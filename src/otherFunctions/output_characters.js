import fse from 'fs-extra';

const output_characters = (charList, folder) => {
  const spaces = process.env.NODE_ENV === 'production' ? 0 : 2;
  const factionKeys = Object.keys(charList);
  factionKeys.forEach((factionKey) => {
    const cleanFactionKey = factionKey.replace(/_lords|_heroes/, '');
    const factionCharKeys = Object.keys(charList[factionKey]);
    factionCharKeys.forEach((charKey) => {
      const charNodeSet = charList[factionKey][charKey];
      delete charNodeSet.fullKey;
      if (charNodeSet.key !== undefined) {
        fse.outputJSONSync(`./output/skills/${folder}/${cleanFactionKey}/${charNodeSet.key}.json`, charNodeSet, { spaces });
      }
    });
  });
};

export default output_characters;
