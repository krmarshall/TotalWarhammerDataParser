import fg from 'fast-glob';
import { exec } from 'child_process';

import { assertTables } from './otherFunctions/index.js';
import { ensureDirSync } from 'fs-extra';

const cwd = 'D:/GitHub/TotalWarhammerDataParser/rpfm';

const extractData = (folder, dbPackName, tablesString, game, inputFolder = folder) => {
  return new Promise((resolveI, rejectI) => {
    exec(
      `rpfm_cli.exe -g ${game} -p "../game_source/${inputFolder}/${dbPackName}.pack" packfile -E "../extracted_files/${folder}" -${tablesString}`,
      { cwd },
      (error) => {
        if (error) {
          rejectI(error);
        } else {
          resolveI();
        }
      }
    );
  });
};

const extractLoc = (folder, locPackName, locsString, game, inputFolder = folder) => {
  return new Promise((resolveI, rejectI) => {
    exec(
      `rpfm_cli.exe -g ${game} -p "../game_source/${inputFolder}/${locPackName}.pack" packfile -e "../extracted_files/${folder}" -${locsString}`,
      { cwd },
      (error) => {
        if (error) {
          rejectI(error);
        } else {
          resolveI();
        }
      }
    );
  });
};

const extractPackfileMass = (folder, dbPackName, locPackName, dbList, locList, game) => {
  return new Promise((resolve, reject) => {
    const tablesString = dbList.reduce((prev, cur) => {
      return `${prev} "db/${cur}"`;
    }, '');
    const dataPromise = extractData(folder, dbPackName, tablesString, game);

    const locsString = locList.reduce((prev, cur) => {
      return `${prev} "text/db/${cur}.loc"`;
    }, '');
    const locPromise = extractLoc(folder, locPackName, locsString, game);

    Promise.all([dataPromise, locPromise])
      .then(() => {
        const missingTables = assertTables(folder, dbList, locList);
        if (missingTables.length > 0) {
          console.log('\x1b[33m', `\b${folder} missing tables: ${missingTables}`, '\x1b[0m');
        }
        resolve();
      })
      .catch((error) => {
        reject(error);
      });
  });
};

const extractTsv = (folder, game) => {
  return new Promise((resolve, reject) => {
    const src = `./extracted_files/${folder}/`;
    const filePaths = fg.sync(`${src}**/*`, { onlyFiles: true, ignore: [`${src}**/*.tsv`, `${src}**/*.png`] });

    const promises = filePaths.map((filePath) => {
      return new Promise((resolveI, rejectI) => {
        exec(`rpfm_cli.exe -g ${game} table -e ".${filePath}"`, { cwd }, (error) => {
          if (error) {
            rejectI(error);
          } else {
            resolveI();
          }
        });
      });
    });
    Promise.all(promises)
      .then(() => {
        resolve();
      })
      .catch((error) => {
        reject(error);
      });
  });
};

const extractPackfileMulti = (folder, dbPackNames, locPackNames, dbList, locList, game) => {
  return new Promise((resolve, reject) => {
    const tablesString = dbList.reduce((prev, cur) => {
      return `${prev} "db/${cur}"`;
    }, '');

    const dataPromises = dbPackNames.map((dbPackName, index) => {
      ensureDirSync(`./extracted_files/${folder}/subDB${index}`);
      return extractData(folder + `/subDB${index}`, dbPackName, tablesString, game, folder);
    });
    const locPromises = locPackNames.map((locPackName, index) => {
      ensureDirSync(`./extracted_files/${folder}/subLOC${index}`);
      if (locList[index].length === 0) {
        return null;
      }
      const locsString = locList[index].reduce((prev, cur) => {
        return `${prev} "text/db/${cur}.loc"`;
      }, '');
      return extractLoc(folder + `/subLOC${index}`, locPackName, locsString, game, folder);
    });

    Promise.all([...dataPromises, ...locPromises])
      .then(() => {
        // Dont think ill check for missing tables in each subfolder, imagine quite a lot will be missing.
        resolve();
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export { extractTsv, extractPackfileMass, extractPackfileMulti };
