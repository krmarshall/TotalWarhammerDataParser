interface TableRecordNoRefs {
  [key: string]: string | TableRecord;
}

interface TableRecordRefs {
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
          [key: string /*DB Name*/]: Array<TableRecord>;
        };
      };
      text: TableRecord;
    };
  };
  parsedData: {
    [key: string /*Folder*/]: {
      db: {
        [key: string /*DB Folder*/]: Array<TableRecord>;
      };
      text: TableRecord;
    };
  };
}

export { GlobalDataInterface, TableRecord };
