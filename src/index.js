import { emptyDirSync } from 'fs-extra';
import { v2DbList, v2LocList } from './extractLists/vanilla2.js';
import { workerVanillaFactory } from './workers/workerFactories.js';

emptyDirSync('./extracted_files');
emptyDirSync('./parsed_files');
emptyDirSync('./output');

// Vanilla 2
workerVanillaFactory('vanilla2', 'data', 'local_en', v2DbList, v2LocList, 'warhammer_2');

// Vanilla 3
workerVanillaFactory('vanilla3', 'data', 'local_en', v2DbList, v2LocList, 'warhammer_3');
