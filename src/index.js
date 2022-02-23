import * as fs from "fs"
import { parse } from 'csv-parse/sync'

const csvParseConfig = {
  delimiter: "\t",
  from: 2,
  record_delimiter: '\n',
  columns: true,
  relax_quotes: true,
  quote: '`',
}

const fileData = fs.readFileSync('./extracted_files/unit_abilities_loc.tsv', 'utf-8');

const records = parse(fileData, csvParseConfig);

const arrayToKeyedObject = (array, key) => {
  const initialObject = {};
  return array.reduce((obj, item) => {
    const keyedObject = {
      ...obj,
      [item[key]]: item,
    };
    delete keyedObject[item[key]][key];
    return keyedObject;
  }, initialObject);
}

const keyedRecords = arrayToKeyedObject(records, 'key');

const jsonString = JSON.stringify(keyedRecords, null, 2)

fs.writeFileSync('./parsed_files/test.json', jsonString);
