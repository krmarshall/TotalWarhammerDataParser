import glob from 'glob';
import * as fs from "fs";
import fse from 'fs-extra';
import { parse } from 'csv-parse/sync';

const csvParseConfig = {
  delimiter: "\t",
  from: 2,
  record_delimiter: '\n',
  columns: true,
  relax_quotes: true,
  quote: '`',
};

const getDirectories = (src, callback) => {
  glob(`${src}**/*.tsv`, callback);
}

const parseVanillaFiles = () => {
  getDirectories('./extracted_files/vanilla/', (error, filePaths) => {
    if (error) {
      console.log(error);
    } else {
      filePaths.map((filePath) => {
        const fileData = fs.readFileSync(filePath, 'utf-8');
        const parsedArray = parse(fileData, csvParseConfig);
        const jsonString = JSON.stringify(parsedArray, null, 2);
        const parsedNewFilePath = filePath.split(/vanilla|\/data__|__.tsv/);
        fse.outputFileSync(`./parsed_files${parsedNewFilePath[1]}.json`, jsonString);
      })
    }
  });
}

export { parseVanillaFiles };
