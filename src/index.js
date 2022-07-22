import { emptyDirSync } from 'fs-extra';
import { v2DbList, v2LocList } from './extractLists/vanilla2.js';
import { v3DbList, v3LocList } from './extractLists/vanilla3.js';
import { workerVanilla } from './workers/workerExports.js';

// As more mods get added keep an eye on these options to potentially help performance
// console.log(process.env.UV_THREADPOOL_SIZE);
// node option --max-old-space-size=8192

emptyDirSync('./extracted_files');
emptyDirSync('./parsed_files');
emptyDirSync('./output');
emptyDirSync('./output_img');
emptyDirSync('./bins/nScripts');

// Vanilla 2
workerVanilla('vanilla2', 'data', 'local_en', v2DbList, v2LocList, 'warhammer_2');

// Vanilla 3
workerVanilla('vanilla3', 'data', 'local_en', v3DbList, v3LocList, 'warhammer_3');
