import fg from 'fast-glob';
import { basename } from 'path';
import fse from 'fs-extra';
import { parse } from 'csv-parse/sync';
import cleanKeyName from './cleanKeyName.js';

const csvParseConfig = {
  delimiter: '\t',
  from: 2,
  record_delimiter: '\n',
  columns: true,
  relax_quotes: true,
  quote: '`',
};

const output_compilationGroups = (folder, packNameEnum) => {
  const compGroups = {};

  const subDBs = fg.sync(`./extracted_files/${folder}/subDB*`, { onlyDirectories: true, onlyFiles: false });
  subDBs.forEach((subDB) => {
    const packName = basename(fg.sync(`${subDB}/*`)[0]);
    const packTag = packNameEnum[packName];
    compGroups[packTag] = {};

    const skillNodeSetTSVs = fg.sync(`${subDB}/db/character_skill_node_sets_tables/*.tsv`);
    skillNodeSetTSVs.forEach((tsv) => {
      const parsedArray = parse(fse.readFileSync(tsv, 'utf-8'), csvParseConfig);
      parsedArray.forEach((nodeSet) => {
        const key = cleanKeyName(nodeSet.key);
        compGroups[packTag][key] = true;
      });
    });
  });

  const sortedObject = {};
  Object.values(packNameEnum).forEach((packName) => (sortedObject[packName] = compGroups[packName]));

  fse.ensureDirSync(`./output/compGroups`);
  fse.writeJSONSync(`./output/compGroups/${folder}.json`, sortedObject, { spaces: 2 });
};

export default output_compilationGroups;
