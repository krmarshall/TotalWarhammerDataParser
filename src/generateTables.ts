import { GlobalDataInterface, TableRecord } from './interfaces/GlobalDataInterface';
import { SchemaInterface, TableInterface } from './interfaces/SchemaInterfaces';
import cleanList from './lists/cleanLists';

const generateTables = (folder: string, globalData: GlobalDataInterface, dbList: Array<string>, schema: SchemaInterface) => {
  const tables: { [key: string]: Table } = {};
  dbList.forEach((db) => {
    tables[db] = new Table(
      db,
      findHighestVersionDB(schema.definitions[db], db),
      globalData.parsedData[folder].db[db],
      globalData.parsedData[folder].text
    );
  });

  const missingTablesSet = new Set<string>();
  Object.keys(tables).forEach((tableKey) => tables[tableKey].linkTables(tables, missingTablesSet));
  return tables;
};

export default generateTables;

class Table {
  tableName: string;
  tableSchema: TableInterface;
  records: Array<TableRecord>;
  indexedKeys: { [key: string]: { [key: string]: number } };

  constructor(tableName: string, tableSchema: TableInterface, tableData: Array<TableRecord>, tableLoc: TableRecord) {
    this.tableName = tableName;
    this.tableSchema = tableSchema;
    this.records = tableData;
    this.indexedKeys = {};

    // Grab keys for fields we want to index, and locs we want to link
    const tablePKeys: Array<string> = [];
    tableSchema.fields.forEach((field) => {
      if (field.is_key) {
        tablePKeys.push(field.name);
        this.indexedKeys[field.name] = {};
      }
    });
    const tableLocFields: { [key: string]: string } = {};
    tableSchema.localised_fields.forEach((field) => {
      if (field.description === 'Deprecated - do not fill in') {
        // Do nothing
      } else {
        tableLocFields[field.name] = field.default_value ?? '';
      }
    });

    const tableCleanList = cleanList[tableName];
    this.records.forEach((record: TableRecord, index: number) => {
      // Create index for keyed fields
      // record[pKey] will always be a string before linkTables()
      tablePKeys.forEach((pKey) => (this.indexedKeys[pKey][record[pKey] as string] = index));

      // Go through columns and delete/convert type
      if (tableCleanList !== undefined) {
        Object.entries(tableCleanList).forEach((cleanInstruction: Array<string>) => cleanColumn(cleanInstruction, record));
      }

      // Link locs to records
      Object.entries(tableLocFields).forEach((locField) => {
        if (tablePKeys.length === 1) {
          record[locField[0]] = tableLoc[`${tableName.replace(/_tables$/, '')}_${locField[0]}_${record[tablePKeys[0]]}`] ?? locField[1];
        } else {
          throw `Loc Link encountered Composite Key: ${tableName} | ${tablePKeys}`;
        }
      });
    });
  }

  findRecordByKey = (keyName: string, keyValue: string) => {
    const recordIndex = this.indexedKeys[keyName][keyValue];
    return this.records[recordIndex];
  };

  linkTables = (tables: { [key: string]: Table }, missingTablesSet: Set<string>) => {
    const referenceFields: Array<{ fieldName: string; refTable: string; refKey: string }> = [];
    this.tableSchema.fields.forEach((field) => {
      if (field.is_reference !== null) {
        referenceFields.push({ fieldName: field.name, refTable: field.is_reference[0], refKey: field.is_reference[1] });
      }
    });

    this.records.forEach((record) => {
      referenceFields.forEach((refField) => {
        if (tables[`${refField.refTable}_tables`] === undefined) {
          missingTablesSet.add(refField.refTable);
        } else if (record[refField.fieldName] === undefined) {
          // Ref field was deleted by cleanColumn
        } else {
          if (typeof record[refField.fieldName] !== 'string') {
            throw `Table already linked: ${this.tableName}`;
          }
          const fieldCurValue = record[refField.fieldName] as string;
          const refRecord = tables[`${refField.refTable}_tables`].findRecordByKey(refField.refKey, fieldCurValue);
          if (refRecord !== undefined) {
            record[refField.fieldName] = refRecord;

            refRecord.foreignRefs === undefined ? (refRecord.foreignRefs = {}) : undefined;
            refRecord.foreignRefs[this.tableName] === undefined ? (refRecord.foreignRefs[this.tableName] = []) : undefined;
            refRecord.foreignRefs[this.tableName].push(record);
          }
        }
      });
    });
  };
}

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

const cleanColumn = (cleanInstruction: Array<string>, record: TableRecord) => {
  const instructionKey = cleanInstruction[0];
  const instructionValue = cleanInstruction[1];

  switch (instructionValue) {
    case 'delete': {
      delete record[instructionKey];
      break;
    }
    case 'int': {
      record[instructionKey] = parseInt(record[instructionKey] as string);
      break;
    }
    case 'float': {
      record[instructionKey] = parseFloat(parseFloat(record[instructionKey] as string).toFixed(4));
      break;
    }
    case 'bool': {
      record[instructionKey] = record[instructionKey] === 'true';
      break;
    }
    default: {
      throw 'No/invalid clean instruction given';
      break;
    }
  }
};
