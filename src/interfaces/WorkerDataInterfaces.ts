import { RefKey } from './GlobalDataInterface';

interface WorkerDataInterface {
  folder: string;
  dbPackName: string;
  locPackName: string;
  dbList: Array<RefKey>;
  locList: Array<string>;
  game: string;
}

export { WorkerDataInterface };
