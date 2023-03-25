import { emptyDirSync } from 'fs-extra';
import { v2DbList, v2LocList } from './extractLists/vanilla2.js';
import { v3DbList, v3LocList } from './extractLists/vanilla3.js';
import { workerVanilla } from './workers/workerExports.js';

// As more mods get added keep an eye on these options to potentially help performance
// console.log(process.env.UV_THREADPOOL_SIZE);
// node option --max-old-space-size=8192

emptyDirSync('./extracted_files');
emptyDirSync('./output');
emptyDirSync('./output_img');
emptyDirSync('./bins/nScripts');
emptyDirSync(`./test`);

// Vanilla 2
workerVanilla({
  folder: 'vanilla2',
  dbPackName: 'data',
  locPackName: 'local_en',
  dbList: v2DbList,
  locList: v2LocList,
  game: 'warhammer_2',
});

// Vanilla 3
workerVanilla({
  folder: 'vanilla3',
  dbPackName: 'data',
  locPackName: 'local_en',
  dbList: v3DbList,
  locList: v3LocList,
  game: 'warhammer_3',
});
