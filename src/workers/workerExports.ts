import { Worker } from 'worker_threads';
import { WorkerDataInterface } from '../interfaces/WorkerDataInterfaces';

const workerVanilla = (workerData: WorkerDataInterface) => {
  const { game } = workerData;
  console.time(`${game} total`);
  const workerScript = game === 'warhammer_2' ? './src/workers/worker2.ts' : './src/workers/worker3.ts';
  const workerVanilla = new Worker(workerScript, {
    workerData,
    execArgv: ['--require', 'ts-node/register'],
  });
  workerVanilla.on('error', (error) => {
    throw error;
  });
  workerVanilla.on('exit', () => {
    console.timeEnd(`${game} total`);
  });
  return workerVanilla;
};

export { workerVanilla };
