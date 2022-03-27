import { existsSync } from 'fs';

const assertTables = (folder, dbList, locList) => {
  const missingTables = [];
  dbList.forEach((table) => {
    if (!existsSync(`./extracted_files/${folder}/db/${table}`)) {
      missingTables.push(table);
    }
  });
  locList.forEach((table) => {
    if (!existsSync(`./extracted_files/${folder}/text/db/${table}.loc`)) {
      missingTables.push(table);
    }
  });
  return missingTables;
};

export default assertTables;
