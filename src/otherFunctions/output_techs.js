import fse from 'fs-extra';
import { techNodeSetsPrune, techNodeSetsPrune2, techNodeSetsPrune3, vanilla3TechNodeSets } from '../lists/techNodeSetsPrune.js';

const output_techs = (techNodeSets, folder, pruneVanilla) => {
  const spaces = process.env.NODE_ENV === 'production' ? 0 : 2;
  const gameTechPrune = folder.includes('2') ? techNodeSetsPrune2 : techNodeSetsPrune3;

  techNodeSets.forEach((nodeSet) => {
    if (techNodeSetsPrune.includes(nodeSet.key)) {
      // Skip
    } else if (gameTechPrune.includes(nodeSet.key)) {
      // Skip
    } else if (pruneVanilla && vanilla3TechNodeSets.includes(nodeSet.key)) {
      // Skip
    } else {
      fse.outputJSON(`./output/techs/${folder}/${nodeSet.key}.json`, nodeSet, { spaces });
    }
  });
};

export default output_techs;
