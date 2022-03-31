import { emptyDirSync } from 'fs-extra';
import fse from 'fs-extra';

const output_characters = (cultures, collatedNodeSets, folder) => {
  emptyDirSync(`./output/${folder}/trees/`);
  const missingCharacters = [];
  cultures.forEach((culture) => {
    const spaces = process.env.NODE_ENV === 'production' ? 0 : 2;
    culture.lordNodeSets.forEach((lord) => {
      if (collatedNodeSets[lord] === undefined && !missingCharacters.includes(lord)) {
        missingCharacters.push(lord);
      } else {
        fse.outputJSON(`./output/${folder}/trees/${culture.key}/${collatedNodeSets[lord].key}.json`, collatedNodeSets[lord], { spaces });
      }
    });

    culture.heroNodeSets.forEach((hero) => {
      if (collatedNodeSets[hero] === undefined && !missingCharacters.includes(hero)) {
        missingCharacters.push(hero);
      } else {
        fse.outputJSON(`./output/${folder}/trees/${culture.key}/${collatedNodeSets[hero].key}.json`, collatedNodeSets[hero], { spaces });
      }
    });
  });
  if (missingCharacters.length > 0) {
    console.log('\x1b[33m', `\b${folder} missing characters: ${missingCharacters}`, '\x1b[0m');
  }
};

export default output_characters;
