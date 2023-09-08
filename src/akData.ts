import { XMLParser } from 'fast-xml-parser';
import { GlobalDataInterface } from './interfaces/GlobalDataInterface';
import { readFileSync } from 'fs-extra';

const akData = (folder: string, globalData: GlobalDataInterface) => {
  const charactersFile = readFileSync(`./game_source/${folder}/start_pos_characters.xml`);
  const characterTraitsFile = readFileSync(`./game_source/${folder}/start_pos_character_traits.xml`);
  const parser = new XMLParser();
  const characters = parser.parse(charactersFile);
  const characterTraits = parser.parse(characterTraitsFile);

  globalData.parsedData[folder].db['start_pos_characters'] = characters.dataroot.start_pos_characters;
  globalData.parsedData[folder].db['start_pos_character_traits'] = characterTraits.dataroot.start_pos_character_traits;
};

export default akData;
