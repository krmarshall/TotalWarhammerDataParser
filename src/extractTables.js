import glob from 'glob';
import { emptydirSync } from 'fs-extra';
import { exec } from 'child_process';

import { assertTables } from './otherFunctions/index.js';

const cwd = 'D:/GitHub/TotalWarhammerDataParser/rpfm';

const extractPackfileMass = (folder, dbPackName, locPackName, dbList, locList, game) => {
  emptydirSync(`./extracted_files/${folder}/`);
  return new Promise((resolve, reject) => {
    const tablesString = dbList.reduce((prev, cur) => {
      return `${prev} "db/${cur}"`;
    }, '');

    const dataPromise = new Promise((resolveI, rejectI) => {
      exec(
        `rpfm_cli.exe -g ${game} -p "../game_source/${folder}/${dbPackName}.pack" packfile -E "../extracted_files/${folder}" -${tablesString}`,
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

    const locsString = locList.reduce((prev, cur) => {
      return `${prev} "text/db/${cur}.loc"`;
    }, '');

    const locPromise = new Promise((resolveI, rejectI) => {
      exec(
        `rpfm_cli.exe -g ${game} -p "../game_source/${folder}/${locPackName}.pack" packfile -e "../extracted_files/${folder}" -${locsString}`,
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

const getDirectories = (src, callback) => {
  glob(`${src}**/*`, { nodir: true, ignore: [`${src}**/*.tsv`, `${src}**/*.png`] }, callback);
};

const extractTsv = (folder, game) => {
  return new Promise((resolve, reject) => {
    getDirectories(`./extracted_files/${folder}/`, (error, filePaths) => {
      if (error) {
        reject(error);
      } else {
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
      }
    });
  });
};

export { extractTsv, extractPackfileMass };
