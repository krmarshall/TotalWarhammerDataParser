import { emptyDirSync } from 'fs-extra';
import { v3DbList, v3LocList } from './lists/extractLists/vanilla3';
import { workerVanilla } from './workers/workerExports';
import { RefKey } from './interfaces/GlobalDataInterface';

emptyDirSync('./extracted_files');
emptyDirSync('./output');
emptyDirSync('./output_img');
emptyDirSync('./bins/nScripts');
emptyDirSync(`./debug`);

// Vanilla 3
workerVanilla({
  folder: 'vanilla3',
  dbPackName: 'data',
  locPackName: 'local_en',
  dbList: v3DbList as unknown as Array<RefKey>,
  locList: v3LocList,
  game: 'warhammer_3',
});
