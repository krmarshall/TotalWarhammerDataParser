import fg from 'fast-glob';
import { readFileSync } from 'fs';
import fse from 'fs-extra';
import { parse } from 'csv-parse/sync';
import { dirname, sep } from 'path';

const csvParseConfig = {
  delimiter: '\t',
  from: 2,
  record_delimiter: '\n',
  columns: true,
  relax_quotes: true,
  quote: '`',
};

const parseFiles = (folder, mod) => {
  return new Promise((resolve) => {
    const dbFilePaths = fg.sync([`./extracted_files/${folder}/db/**/*.tsv`, `./extracted_files/${folder}/subDB*/**/*.tsv`], {
      onlyFiles: true,
    });
    const locFilePaths = fg.sync([`./extracted_files/${folder}/text/db/**/*.tsv`, `./extracted_files/${folder}/subLOC*/**/*.tsv`], {
      onlyFiles: true,
    });
    const spaces = process.env.NODE_ENV === 'production' ? 0 : 2;
    const locObject = {};

    dbFilePaths.forEach((filePath) => {
      const fileData = readFileSync(filePath, 'utf-8');
      const parsedArray = parse(fileData, csvParseConfig);

      if (mod) {
        const stripTsv = filePath.replace('.tsv', '');
        fse.outputJSONSync(`${stripTsv}.json`, parsedArray, { spaces });
      } else {
        const fileDir = dirname(filePath).split('/');
        const dbFolder = fileDir[fileDir.length - 1];
        fse.outputJSONSync(`./parsed_files/${folder}/db/${dbFolder}.json`, parsedArray, { spaces });
      }
    });

    locFilePaths.forEach((filePath) => {
      const fileData = readFileSync(filePath, 'utf-8');
      const parsedArray = parse(fileData, csvParseConfig);

      parsedArray.forEach((loc) => {
        locObject[loc.key] = loc.text;
      });
    });

    if (mod) {
      fse.outputJSONSync(`./parsed_files/${folder}/text/db/modLoc.json`, locObject, { spaces });
    } else {
      fse.outputJSONSync(`./parsed_files/${folder}/text/db/combinedLoc.json`, locObject, { spaces });
    }
    resolve();
  });
};

export { parseFiles };
