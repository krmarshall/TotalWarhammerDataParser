import fse from 'fs-extra';

const output_techs = (techNodeSets, folder) => {
  const spaces = process.env.NODE_ENV === 'production' ? 0 : 2;

  techNodeSets.forEach((nodeSet) => {
    fse.outputJSON(`./output/techs/${folder}/${nodeSet.key}.json`, nodeSet, { spaces });
  });
};

export default output_techs;
