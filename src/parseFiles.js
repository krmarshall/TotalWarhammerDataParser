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

const parseVanillaFiles = () => {
  console.time(`vanilla parse`);
  return new Promise((resolve, reject) => {
    getDirectories('./extracted_files/vanilla/', (error, filePaths) => {
      if (error) {
        reject(error);
      } else {
        filePaths.map((filePath) => {
          const fileData = fs.readFileSync(filePath, 'utf-8');
          const parsedArray = parse(fileData, csvParseConfig);
          const jsonString = JSON.stringify(parsedArray, null, 2);
          const parsedNewFilePath = filePath.split(/vanilla|\/data__|__.tsv/);
          fse.outputFileSync(`./parsed_files/vanilla${parsedNewFilePath[1]}.json`, jsonString);
        });
        console.timeEnd(`vanilla parse`);
        resolve();
      }
    });
  });
};

const parseVanilla3Files = () => {
  console.time(`vanilla3 parse`);
  return new Promise((resolve, reject) => {
    getDirectories('./extracted_files/vanilla3/', (error, filePaths) => {
      if (error) {
        reject(error);
      } else {
        filePaths.map((filePath) => {
          const fileData = fs.readFileSync(filePath, 'utf-8');
          const parsedArray = parse(fileData, csvParseConfig);
          const jsonString = JSON.stringify(parsedArray, null, 2);
          const parsedNewFilePath = filePath.split(/vanilla3|\/data__|__.tsv/);
          fse.outputFileSync(`./parsed_files/vanilla3${parsedNewFilePath[1]}.json`, jsonString);
        });
        console.timeEnd(`vanilla3 parse`);
        resolve();
      }
    });
  });
};

export { parseVanillaFiles, parseVanilla3Files };
