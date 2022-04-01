import glob from 'glob';
import { readFileSync } from 'fs';
import { emptydirSync } from 'fs-extra';
// Cant specify outputFileSync as a specific fse import z.z
import fse from 'fs-extra';
import { parse } from 'csv-parse/sync';
import { dirname } from 'path';

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
  emptydirSync(`./parsed_files/${folder}/`);
  return new Promise((resolve, reject) => {
    getDirectories(`./extracted_files/${folder}/`, (error, filePaths) => {
      if (error) {
        reject(error);
      } else {
        const spaces = process.env.NODE_ENV === 'production' ? 0 : 2;
        filePaths.forEach((filePath) => {
          const fileData = readFileSync(filePath, 'utf-8');
          const parsedArray = parse(fileData, csvParseConfig);

          const fileDir = dirname(filePath);
          const splitDirs = fileDir.split('/');
          if (splitDirs[3] === 'db') {
            fse.outputJSONSync(`./parsed_files/${folder}/db/${splitDirs[4]}.json`, parsedArray, { spaces });
          } else if (splitDirs[3] === 'text') {
            let cleanedPath = filePath.replace(`./extracted_files/${folder}/text/db/`, '');
            cleanedPath = cleanedPath.split(/__.tsv|.tsv/)[0];
            fse.outputJSONSync(`./parsed_files/${folder}/text/db/${cleanedPath}.json`, parsedArray, { spaces });
          } else {
            throw 'Attempted to parse invalid folder';
          }
        });
        resolve();
      }
    });
  });
};

const parseMods = (folder) => {
  return new Promise((resolve, reject) => {
    getDirectories(`./extracted_files/${folder}/`, (error, filePaths) => {
      if (error) {
        reject(error);
      } else {
        const spaces = process.env.NODE_ENV === 'production' ? 0 : 2;
        filePaths.forEach((filePath) => {
          const fileData = readFileSync(filePath, 'utf-8');
          const parsedArray = parse(fileData, csvParseConfig);
          const stripTsv = filePath.replace('.tsv', '');
          fse.outputJSONSync(`${stripTsv}.json`, parsedArray, { spaces });
        });
        resolve();
      }
    });
  });
};

export { parseFiles, parseMods };
