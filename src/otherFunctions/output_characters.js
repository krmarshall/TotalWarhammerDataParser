import { emptyDirSync } from 'fs-extra';
import fse from 'fs-extra';
import outputCharactersPrune from '../pruneLists/outputCharactersPrune.js';

const output_characters = (cultures, collatedNodeSets, folder) => {
  emptyDirSync(`./output/${folder}/`);
  const missingCharacters = [];
  cultures.forEach((culture) => {
    const spaces = process.env.NODE_ENV === 'production' ? 0 : 2;
    culture.lordNodeSets.forEach((lord) => {
      if (collatedNodeSets[lord] === undefined && !missingCharacters.includes(lord)) {
        missingCharacters.push(lord);
        return;
      }
      if (outputCharactersPrune.includes(collatedNodeSets[lord].key)) {
        return;
      }
      // WH3 has beastlords randomly in subculture pools like oxyotl?
      if (culture.key !== 'wh_dlc03_bst_beastmen' && collatedNodeSets[lord].key === 'bst_beastlord') {
        return;
      }
      fse.outputJSON(`./output/${folder}/${culture.key}/${collatedNodeSets[lord].key}.json`, collatedNodeSets[lord], { spaces });
    });

    culture.heroNodeSets.forEach((hero) => {
      if (collatedNodeSets[hero] === undefined && !missingCharacters.includes(hero)) {
        missingCharacters.push(hero);
        return;
      }
      if (outputCharactersPrune.includes(collatedNodeSets[hero].key)) {
        return;
      }
      fse.outputJSON(`./output/${folder}/${culture.key}/${collatedNodeSets[hero].key}.json`, collatedNodeSets[hero], { spaces });
    });
  });
  if (missingCharacters.length > 0) {
    console.log('\x1b[33m', `\b${folder} missing characters: ${missingCharacters}`, '\x1b[0m');
  }
};

export default output_characters;
