interface TableRecordNoRefs {
  [key: string]: string;
}

interface TableRecordRefs {
  // This record referencing another
  localRefs?: {
    [key: string /*Table*/]: TableRecord;
  };
  // Other records referencing this
  foreignRefs?: {
    [key: string /*Table*/]: Array<TableRecord>;
  };
}

type TableRecord = TableRecordNoRefs & TableRecordRefs;

interface GlobalDataInterface {
  imgPaths: {
    [key: string /*Folder*/]: {
      [key: string /*Filepath*/]: string;
    };
  };
  extractedData: {
    [key: string /*Folder*/]: {
      db: {
        [key: string /*DB Folder*/]: {
          [key: string /*DB Name*/]: Array<TableRecordNoRefs>;
        };
      };
      text: TableRecordNoRefs;
    };
  };
  parsedData: {
    [key: string /*Folder*/]: {
      db: {
        [key: string /*DB Folder*/]: Array<TableRecordNoRefs>;
      };
      text: TableRecordNoRefs;
    };
  };
}

export { GlobalDataInterface, TableRecord };
