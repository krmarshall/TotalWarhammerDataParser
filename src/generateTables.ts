import { GlobalDataInterface, TableRecord } from './interfaces/GlobalDataInterface';
import { SchemaInterface, TableInterface } from './interfaces/SchemaInterfaces';

class Table {
  tableName: string;
  tableSchema: TableInterface;
  records: Array<TableRecord>;
  indexedKeys: { [key: string]: { [key: string]: number } };

  constructor(tableName: string, tableSchema: TableInterface, tableData: Array<TableRecord>) {
    this.tableName = tableName;
    this.tableSchema = tableSchema;
    this.records = tableData;
    this.indexedKeys = {};

    const tablePKeys: Array<string> = [];
    tableSchema.fields.forEach((field) => {
      if (field.is_key) {
        tablePKeys.push(field.name);
        this.indexedKeys[field.name] = {};
      }
    });

    this.records.forEach((record: TableRecord, index: number) => {
      // record[pKey] will always be a string before linkTables()
      tablePKeys.forEach((pKey) => (this.indexedKeys[pKey][record[pKey] as string] = index));
    });
  }
}

const generateTables = (folder: string, globalData: GlobalDataInterface, dbList: Array<string>, schema: SchemaInterface) => {
  const tables: { [key: string]: Table } = {};
  dbList.forEach((db) => {
    tables[db] = new Table(db, findHighestVersionDB(schema.definitions[db], db), globalData.parsedData[folder].db[db]);
  });
  return tables;
};

const findHighestVersionDB = (tableVersions: Array<TableInterface>, dbKey: string) => {
  if (tableVersions.length === 0) {
    throw `Table missing schema definition: ${dbKey}`;
  } else if (tableVersions.length === 1) {
    return tableVersions[0];
  } else {
    let highestVersionIndex = 0;
    let highestVersion = tableVersions[0].version;
    tableVersions.forEach((table, index) => {
      if (table.version > highestVersion) {
        highestVersionIndex = index;
        highestVersion = table.version;
      }
    });

    return tableVersions[highestVersionIndex];
  }
};

export default generateTables;
