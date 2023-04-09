import { emptyDirSync } from 'fs-extra';
import { v3DbList, v3LocList } from './extractLists/vanilla3';
import { workerVanilla } from './workers/workerExports';

emptyDirSync('./extracted_files');
emptyDirSync('./output');
emptyDirSync('./output_img');
emptyDirSync('./bins/nScripts');
emptyDirSync(`./test`);

// Vanilla 3
workerVanilla({
  folder: 'vanilla3',
  dbPackName: 'data',
  locPackName: 'local_en',
  dbList: v3DbList,
  locList: v3LocList,
  game: 'warhammer_3',
});
