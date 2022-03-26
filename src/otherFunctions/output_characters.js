import { emptyDirSync } from 'fs-extra';
import fse from 'fs-extra';

const output_characters = (cultures, collatedNodeSets, folder) => {
  emptyDirSync(`./output/${folder}/`);
  const missingCharacters = [];
  cultures.forEach((culture) => {
    culture.lordNodeSets.forEach((lord) => {
      if (collatedNodeSets[lord] === undefined && !missingCharacters.includes(lord)) {
        missingCharacters.push(lord);
      } else {
        const spaces = process.env.production ? 0 : 2;
        fse.outputJSON(`./output/${folder}/${culture.key}/${collatedNodeSets[lord].key}.json`, collatedNodeSets[lord], { spaces });
      }
    });

    culture.heroNodeSets.forEach((hero) => {
      if (collatedNodeSets[hero] === undefined && !missingCharacters.includes(hero)) {
        missingCharacters.push(hero);
      } else {
        const spaces = process.env.production ? 0 : 2;
        fse.outputJSON(`./output/${folder}/${culture.key}/${collatedNodeSets[hero].key}.json`, collatedNodeSets[hero], { spaces });
      }
    });
  });
  if (missingCharacters.length > 0) {
    console.log('\x1b[33m', `\b${folder} missing characters: ${missingCharacters}`, '\x1b[0m');
  }
};

export default output_characters;
