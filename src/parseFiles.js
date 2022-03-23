import glob from 'glob';
import * as fs from 'fs';
import fse from 'fs-extra';
import { parse } from 'csv-parse/sync';

const csvParseConfig = {
  delimiter: '\t',
  from: 2,
  record_delimiter: '\n',
  columns: true,
  relax_quotes: true,
  quote: '`',
};

const getDirectories = (src, callback) => {
  glob(`${src}**/*.tsv`, callback);
};

const parseFiles = (folder) => {
  console.time(`${folder} parse`);
  return new Promise((resolve, reject) => {
    getDirectories(`./extracted_files/${folder}/`, (error, filePaths) => {
      if (error) {
        reject(error);
      } else {
        filePaths.map((filePath) => {
          const fileData = fs.readFileSync(filePath, 'utf-8');
          const parsedArray = parse(fileData, csvParseConfig);
          const jsonString = JSON.stringify(parsedArray, null, 2);
          const tempNewFilePath = filePath.split(folder);
          const parsedNewFilePath = tempNewFilePath[1].split(/\/data__|__|.tsv/);
          fse.outputFileSync(`./parsed_files/${folder}${parsedNewFilePath[0]}.json`, jsonString);
        });
        console.timeEnd(`${folder} parse`);
        resolve();
      }
    });
  });
};

export default parseFiles;
