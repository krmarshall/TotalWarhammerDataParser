import fg from 'fast-glob';
import { basename } from 'path';

const globalDataInit = (folder) => {
  const game = folder.includes('2') ? '2' : '3';
  const globalData = {};
  globalData.extractedData = {};
  globalData.parsedData = {};
  globalData.imgPaths = {};
  const modFolders = fg.sync(`./game_source/*${game}/`, { onlyDirectories: true });
  modFolders.forEach((folderPath) => {
    const folder = basename(folderPath);
    globalData.extractedData[folder] = {};
    globalData.extractedData[folder].db = {};
    globalData.extractedData[folder].text = {};
    globalData.parsedData[folder] = {};
    globalData.parsedData[folder].db = {};
    globalData.parsedData[folder].text = {};
    globalData.imgPaths[folder] = {};
  });
  return globalData;
};

export default globalDataInit;
