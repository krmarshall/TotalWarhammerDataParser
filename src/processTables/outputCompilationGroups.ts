import fg from 'fast-glob';
import { basename } from 'path';
import fse from 'fs-extra';
import { parse } from 'csv-parse/sync';
import cleanNodeSetKey from '../utils/cleanNodeSetKey';
import { TableRecord } from '../interfaces/GlobalDataInterface';

const csvParseConfig = {
  delimiter: '\t',
  from: 2,
  record_delimiter: '\n',
  columns: true,
  relax_quotes: true,
  quote: '`',
};

interface CompGroupsInterface {
  [key: string]: { [key: string]: boolean };
}

const outputCompilationGroups = (folder: string, packNameEnum: { [key: string]: string }) => {
  const compGroups: CompGroupsInterface = {};

  const subDBs = fg.sync(`./extracted_files/${folder}/subDB*`, { onlyDirectories: true, onlyFiles: false });
  subDBs.forEach((subDB) => {
    const packName = basename(fg.sync(`${subDB}/*`)[0]);
    const packTag = packNameEnum[packName];
    compGroups[packTag] = {};

    const skillNodeSetTSVs = fg.sync(`${subDB}/db/character_skill_node_sets_tables/*.tsv`);
    skillNodeSetTSVs.forEach((tsv) => {
      const parsedArray = parse(fse.readFileSync(tsv, 'utf-8'), csvParseConfig);
      parsedArray.forEach((nodeSet: TableRecord) => {
        const key = cleanNodeSetKey(nodeSet.key);
        compGroups[packTag][key] = true;
      });
    });
  });

  const sortedObject: CompGroupsInterface = {};
  Object.values(packNameEnum).forEach((packName) => (sortedObject[packName] = compGroups[packName]));

  fse.ensureDirSync(`./output/compGroups`);
  fse.writeJSONSync(`./output/compGroups/${folder}.json`, sortedObject, { spaces: 2 });
};

export default outputCompilationGroups;
