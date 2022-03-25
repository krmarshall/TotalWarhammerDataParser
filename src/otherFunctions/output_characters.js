import { emptyDirSync, outputFile } from 'fs-extra';

const output_characters = (cultures, collatedNodeSets, folder) => {
  emptyDirSync(`./output/${folder}/`);
  const missingCharacters = [];
  cultures.forEach((culture) => {
    culture.lordNodeSets.forEach((lord) => {
      if (collatedNodeSets[lord] === undefined && !missingCharacters.includes(lord)) {
        missingCharacters.push(lord);
      } else {
        outputFile(`./output/${folder}/${culture.key}/${collatedNodeSets[lord].key}.json`, JSON.stringify(collatedNodeSets[lord], null, 2));
      }
    });

    culture.heroNodeSets.forEach((hero) => {
      if (collatedNodeSets[hero] === undefined && !missingCharacters.includes(hero)) {
        missingCharacters.push(hero);
      } else {
        outputFile(`./output/${folder}/${culture.key}/${collatedNodeSets[hero].key}.json`, JSON.stringify(collatedNodeSets[hero], null, 2));
      }
    });
  });
  if (missingCharacters.length > 0) {
    console.log('\x1b[33m', `\b${folder} missing characters: ${missingCharacters}`, '\x1b[0m');
  }
};

export default output_characters;
